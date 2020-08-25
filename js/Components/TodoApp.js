import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import { validateUserName, validateInstance } from "../utils.js";
import TodoCount from "./TodoCount.js";
import TodoFilter from "./Todofilter.js";
import { FilterType } from "../constants.js";
import Loader from "../Components/Loader.js";
import {
  fetchTodoItemsByUserNameFromServer,
  addTodoItem2Server,
  toggleTodoItmeByIdFromServer,
  deleteTodoItemByIdFromServer,
  editTodoItemContentsByIdFromServer,
  changeTodoItemPriorityByIdFromServer,
} from "../api.js";

function TodoApp($target, activeUser) {
  validateInstance(TodoApp, this);
  validateUserName(activeUser);

  this.state = {
    activeUser,
    filterType: FilterType.ALL,
    isLoading: false,
    todoItems: [],
  };

  this.setState = (state) => {
    if (state && state.activeUser) {
      validateUserName(state.activeUser);
      this.state.activeUser = state.activeUser;
      this.fetchTodoItems();
    }

    if (state && typeof state.isLoading === "boolean") {
      this.state.isLoading = state.isLoading;
    }

    this.render();

    if (this.state.isLoading) {
      return;
    }

    this.initComponents();
  };

  this.addTodo = async (contentText) => {
    try {
      this.setState({ isLoading: true });
      const newTodo = await addTodoItem2Server(
        this.state.activeUser,
        contentText
      );
      this.state.todoItems = [...this.state.todoItems, newTodo];
    } catch {
    } finally {
      this.setState({ isLoading: false });
      this.todoInput.focusInputElem();
    }
  };

  this.deleteTodoById = (id) => {
    const todoItemIdx = this.state.todoItems.findIndex(({ _id }) => _id === id);
    if (todoItemIdx === -1) {
      console.log(`Can't find todoItem with id : ${id}`);
      return;
    }
    this.state.todoItems.splice(todoItemIdx, 1);
    const filteredTodoItems = this.getFilteredTodoItems();
    this.todoList.setState(filteredTodoItems);
    this.todoCount.setState(filteredTodoItems.length);
    deleteTodoItemByIdFromServer(this.state.activeUser, id);
  };

  this.deleteAllTodo = () => {
    this.state.todoItems.forEach(({ _id }) =>
      deleteTodoItemByIdFromServer(this.state.activeUser, _id)
    );
    this.state.todoItems = [];
    this.state.todoList.setState(this.state.todoItems);
    this.state.todoCount.setState(this.state.todoItems.length);
  };

  this.toggleTodoById = (id) => {
    const todoItem = this.state.todoItems.find(({ _id }) => _id === id);
    if (!todoItem) {
      console.log(`Can't find todoItem with id : ${id}`);
      return;
    }
    todoItem.isCompleted = !todoItem.isCompleted;
    const filteredTodoItems = this.getFilteredTodoItems();
    this.todoList.setState(filteredTodoItems);
    this.todoCount.setState(filteredTodoItems.length);
    toggleTodoItmeByIdFromServer(this.state.activeUser, id);
  };

  this.editTodoById = (id, contents) => {
    const todoItem = this.state.todoItems.find(({ _id }) => _id === id);
    if (!todoItem) {
      console.log(`Can't find todoItem with id : ${id}`);
      return;
    }
    if (contents !== "") {
      todoItem.contents = contents;
    }
    const filteredTodoItems = this.getFilteredTodoItems();
    this.todoList.setState(filteredTodoItems);
    editTodoItemContentsByIdFromServer(this.state.activeUser, id, contents);
  };

  this.changeTodoPriorityById = (id, priority) => {
    const todoItem = this.state.todoItems.find(({ _id }) => _id === id);
    if (!todoItem) {
      console.log(`Can't find todoItem with id : ${id}`);
      return;
    }
    todoItem.priority = priority;
    const filteredTodoItems = this.getFilteredTodoItems();
    this.todoList.setState(filteredTodoItems);
    changeTodoItemPriorityByIdFromServer(this.state.activeUser, id, priority);
  };

  this.setFilterType = (newFilterType) => {
    if (this.state.filterType === newFilterType) {
      return;
    }
    this.state.filterType = newFilterType;
    this.todoFilter.setState(this.state.filterType);
    const filteredTodoItems = this.getFilteredTodoItems();
    this.todoList.setState(filteredTodoItems);
    this.todoCount.setState(filteredTodoItems.length);
  };

  this.getFilteredTodoItems = () => {
    switch (this.state.filterType) {
      case FilterType.ACTIVE:
        return this.state.todoItems.filter(({ isCompleted }) => !isCompleted);
      case FilterType.COMPLETED:
        return this.state.todoItems.filter(({ isCompleted }) => isCompleted);
      default:
        return this.state.todoItems;
    }
  };

  this.render = () => {
    $target.innerHTML = this.isLoading
      ? Loader
      : `
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

  this.initEventListeners = () => {
    $target.addEventListener("click", this.onClickDeleteAllBtn.bind(this));
  };

  this.onClickDeleteAllBtn = (event) => {
    if (!event.target.classList.contains("clear-completed")) {
      return;
    }
    this.deleteAllTodo();
  };

  this.fetchTodoItems = async () => {
    try {
      this.setState({ isLoading: true });
      this.state.todoItems = await fetchTodoItemsByUserNameFromServer(
        this.state.activeUser
      );
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  this.initComponents = () => {
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
        changeTodoPriorityById: (id, priority) =>
          this.changeTodoPriorityById(id, priority),
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
  };

  this.initEventListeners();
  this.render();
  this.initComponents();
  this.fetchTodoItems();
}

export default TodoApp;
