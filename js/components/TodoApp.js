import TodoUser from "./TodoUser.js";
import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import TodoCount from "./TodoCount.js";
import { useLocalStorage, generateId } from "../utils.js";

const LOCAL_STORAGE_KEY = "todos";
const [getData, setData] = useLocalStorage(LOCAL_STORAGE_KEY);

export default function TodoApp(appEl) {
  const titleEl = appEl.querySelector("#user-title");
  const userListEl = appEl.querySelector("#user-list");
  const inputEl = appEl.querySelector(".new-todo");
  const listEl = appEl.querySelector(".todo-list");
  const countContainerEl = appEl.querySelector(".count-container");

  this.userList = [];
  this.selectedUser = null ?? { _id: "", name: "" };
  this.todos = getData() ?? [];
  this.filter = null;
  this.editingId = null;
  this.isLoading = false;

  this.todoUser = new TodoUser(titleEl, userListEl, this);
  this.todoInput = new TodoInput(inputEl, this);
  this.todoList = new TodoList(listEl, this);
  this.todoCountContainer = new TodoCount(countContainerEl, this);

  this.setTodos = (todos) => {
    this.todos = todos;
    this.render();

    setData(todos);
  };

  this.getTodo = (targetId) => this.todos.find(({ id }) => id === targetId);

  this.addTodo = (value) =>
    this.setTodos([
      { id: generateId(), value, completed: this.filter ?? false },
      ...this.todos,
    ]);

  this.updateTodo = (todo) =>
    this.setTodos(
      this.todos.map((_todo) => (_todo.id !== todo.id ? _todo : todo))
    );

  this.deleteTodo = (targetId) =>
    this.setTodos(this.todos.filter(({ id }) => id !== targetId));

  this.setFilter = (filter = null) => {
    this.filter = filter;
    this.render();
  };

  this.setEditingId = (id = null) => {
    this.editingId = id;
    this.render();
  };

  this.toggleIsLoading = () => {
    this.isLoading = !this.isLoading;
    this.render();
  };

  this.render = () => {
    const filteredTodos = this.todos.filter(
      ({ completed }) => this.filter === null || completed === this.filter
    );

    this.todoUser.render();
    this.todoInput.render();
    this.todoList.render(filteredTodos);
    this.todoCountContainer.render(filteredTodos);
  };
}
