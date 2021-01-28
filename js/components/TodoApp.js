import TodoUser from "./TodoUser.js";
import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import TodoCount from "./TodoCount.js";
import { User } from "../apis.js";

export default function TodoApp(appEl) {
  this.init = async () => {
    const titleEl = appEl.querySelector("#user-title");
    const userListEl = appEl.querySelector("#user-list");
    const inputEl = appEl.querySelector(".new-todo");
    const listEl = appEl.querySelector(".todo-list");
    const countContainerEl = appEl.querySelector(".count-container");

    this.users = (await User.getUsers()) ?? [];
    this.chosenUser = this.users[0] ?? { _id: "", name: "", todoList: [] };
    this.todos = this.chosenUser.todoList;
    this.filter = null;
    this.editingId = null;
    this.isLoading = false;

    this.todoUser = new TodoUser(titleEl, userListEl, this);
    this.todoInput = new TodoInput(inputEl, this);
    this.todoList = new TodoList(listEl, this);
    this.todoCountContainer = new TodoCount(countContainerEl, this);

    this.render();
  };

  this.chooseUser = async (userId) => {
    this.chosenUser = this.users.find(({ _id }) => _id === userId);
    this.todos = [];
    this.setIsLoading(true);

    this.users = await User.getUsers();
    this.chosenUser = this.users.find(({ _id }) => _id === userId);
    this.todos = this.chosenUser.todoList;
    this.setIsLoading(false);
  };

  this.createUser = async (userName) => {
    this.setIsLoading(true);
    const user = await User.addUser(userName);

    this.users = await User.getUsers();
    this.chosenUser = this.users.find(({ _id }) => _id === user._id);
    this.todos = this.chosenUser.todoList;
    this.setIsLoading(false);
  };

  this.setTodos = (todos) => {
    this.todos = todos;
    this.render();
  };

  this.getTodo = (targetId) => this.todos.find(({ _id }) => _id === targetId);

  this.addTodo = (contents) =>
    this.setTodos([
      { _id: "", contents, isCompleted: this.filter ?? false },
      ...this.todos,
    ]);

  this.updateTodo = (todo) =>
    this.setTodos(
      this.todos.map((_todo) => (_todo._id !== todo._id ? _todo : todo))
    );

  this.deleteTodo = (targetId) =>
    this.setTodos(this.todos.filter(({ _id }) => _id !== targetId));

  this.setFilter = (filter = null) => {
    this.filter = filter;
    this.render();
  };

  this.setEditingId = (id = null) => {
    this.editingId = id;
    this.render();
  };

  this.setIsLoading = (isLoading) => {
    if (this.isLoading === isLoading) {
      return;
    }

    this.isLoading = isLoading;
    this.render();
  };

  this.render = () => {
    const filteredTodos = this.todos.filter(
      ({ isCompleted }) => this.filter === null || isCompleted === this.filter
    );

    this.todoUser.render();
    this.todoInput.render();
    this.todoList.render(filteredTodos);
    this.todoCountContainer.render(filteredTodos);
  };

  this.init();
}
