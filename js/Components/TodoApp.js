import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import { validateUserName } from "../utils.js";
import TodoCount from "./TodoCount.js";
import TodoFilter from "./Todofilter.js";
import { FilterType } from "../constants.js";
import {
  fetchTodoItemsByUserNameFromServer,
  addTodoItem2Server,
  toggleTodoItmeByIdFromServer,
  deleteTodoItemByIdFromServer,
  editTodoItemByIdFromServer,
} from "../api.js";

function TodoApp($target, activeUser) {
  if (!new.target) {
    throw new Error("Create instance with 'new'");
  }

  validateUserName(activeUser);

  this.activeUser = activeUser;
  this.filterType = FilterType.ALL;
  this.todoItems = [];

  this.setState = (newActiveUser) => {
    validateUserName(newActiveUser);
    this.activeUser = newActiveUser;
    this.init();
  };

  this.addTodo = async (contentText) => {
    const newTodo = await addTodoItem2Server(this.activeUser, contentText);
    this.todoItems.push(newTodo);
    const filteredTodoItems = this.getFilteredTodoItems();
    this.todoList.setState(filteredTodoItems);
    this.todoCount.setState(filteredTodoItems.length);
  };

  this.deleteTodoById = (id) => {
    const todoItemIdx = this.todoItems.findIndex(({ _id }) => _id === id);
    if (todoItemIdx === -1) {
      console.log(`Can't find todoItem with id : ${id}`);
      return;
    }
    this.todoItems.splice(todoItemIdx, 1);
    const filteredTodoItems = this.getFilteredTodoItems();
    this.todoList.setState(filteredTodoItems);
    this.todoCount.setState(filteredTodoItems.length);
    deleteTodoItemByIdFromServer(this.activeUser, id);
  };

  this.deleteAllTodo = () => {
    this.todoItems.forEach(({ _id }) =>
      deleteTodoItemByIdFromServer(this.activeUser, _id)
    );
    this.todoItems = [];
    this.todoList.setState(this.todoItems);
    this.todoCount.setState(this.todoItems.length);
  };

  this.toggleTodoById = (id) => {
    const todoItem = this.todoItems.find(({ _id }) => _id === id);
    if (!todoItem) {
      console.log(`Can't find todoItem with id : ${id}`);
      return;
    }
    todoItem.isCompleted = !todoItem.isCompleted;
    const filteredTodoItems = this.getFilteredTodoItems();
    this.todoList.setState(filteredTodoItems);
    toggleTodoItmeByIdFromServer(this.activeUser, id);
  };

  this.editTodoById = (id, contents) => {
    const todoItem = this.todoItems.find(({ _id }) => _id === id);
    if (!todoItem) {
      console.log(`Can't find todoItem with id : ${id}`);
      return;
    }
    if (contents !== "") {
      todoItem.contents = contents;
    }
    const filteredTodoItems = this.getFilteredTodoItems();
    this.todoList.setState(filteredTodoItems);
    editTodoItemByIdFromServer(this.activeUser, id, contents);
  };

  this.setFilterType = (newFilterType) => {
    if (this.filterType === newFilterType) {
      return;
    }
    this.filterType = newFilterType;
    this.todoFilter.setState(this.filterType);
    const filteredTodoItems = this.getFilteredTodoItems();
    this.todoList.setState(filteredTodoItems);
    this.todoCount.setState(filteredTodoItems.length);
  };

  this.getFilteredTodoItems = () => {
    switch (this.filterType) {
      case FilterType.ACTIVE:
        return this.todoItems.filter(({ isCompleted }) => !isCompleted);
      case FilterType.COMPLETED:
        return this.todoItems.filter(({ isCompleted }) => isCompleted);
      default:
        return this.todoItems;
    }
  };

  this.render = () => {
    $target.innerHTML = `
      <section id="todo-input" class="input-container">
      </section>

      <section class="main">
        <div id="todo-list"></div>
      </section>

      <div class="count-container">
        <div id="todo-count"></div>
        <div id="todo-filter"></div>
        <button class="clear-completed">모두 삭제</button>
      </div>
    `;
  };

  this.init = async () => {
    this.render();

    this.todoItems = await fetchTodoItemsByUserNameFromServer(this.activeUser);
    const filteredTodoItems = this.getFilteredTodoItems();

    this.todoInput = new TodoInput(document.getElementById("todo-input"), {
      onSubmit: (contentText) => this.addTodo(contentText),
    });
    this.todoList = new TodoList(
      document.getElementById("todo-list"),
      filteredTodoItems,
      {
        deleteTodoById: (id) => this.deleteTodoById(id),
        toggleTodoById: (id) => this.toggleTodoById(id),
        editTodoById: (id, contents) => this.editTodoById(id, contents),
      }
    );
    this.todoCount = new TodoCount(
      document.getElementById("todo-count"),
      filteredTodoItems.length
    );
    this.todoFilter = new TodoFilter(
      document.getElementById("todo-filter"),
      this.filterType,
      { onChangeType: (newFilterType) => this.setFilterType(newFilterType) }
    );

    document
      .querySelector(".clear-completed")
      .addEventListener("click", () => this.deleteAllTodo());
  };

  this.init();
}

export default TodoApp;
