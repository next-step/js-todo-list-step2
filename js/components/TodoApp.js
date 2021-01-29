import TodoUser from "./TodoUser.js";
import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import TodoCount from "./TodoCount.js";
import { User, Todo } from "../apis.js";

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

    this.toggleIsLoading(async () => {
      this.users = await User.getUsers();
      this.chosenUser = this.users.find(({ _id }) => _id === userId);
      this.todos = this.chosenUser.todoList;
    });
  };

  this.createUser = async (userName) =>
    this.toggleIsLoading(async () => {
      const user = await User.addUser(userName);

      this.users = await User.getUsers();
      this.chosenUser = this.users.find(({ _id }) => _id === user._id);
      this.todos = this.chosenUser.todoList;
    });

  this.deleteUser = async (userId) =>
    this.toggleIsLoading(async () => {
      await User.deleteUser(userId);

      this.users = await User.getUsers();
      this.chosenUser = this.users[0];
      this.todos = this.chosenUser.todoList;
    });

  this.getTodo = (targetId) => this.todos.find(({ _id }) => _id === targetId);

  this.addTodo = async (contents) =>
    this.toggleIsLoading(async () => {
      const { _id: userId } = this.chosenUser;
      await Todo.addTodo(userId, contents);

      this.todos = await Todo.getTodos(userId);
    });

  this.toggleIsComplete = async ({ _id: itemId }) =>
    this.toggleIsLoading(async () => {
      const { _id: userId } = this.chosenUser;
      await Todo.toggleIsComplete(userId, itemId);

      this.todos = await Todo.getTodos(userId);
    });

  this.updateContents = async (todo) =>
    this.toggleIsLoading(async () => {
      const { _id: userId } = this.chosenUser;
      await Todo.updateContents(userId, todo);

      this.todos = await Todo.getTodos(userId);
    });

  this.deleteTodo = async (itemId) =>
    this.toggleIsLoading(async () => {
      const { _id: userId } = this.chosenUser;
      await Todo.deleteTodo(userId, itemId);

      this.todos = await Todo.getTodos(userId);
    });

  this.deleteAllTodos = async () =>
    this.toggleIsLoading(async () => {
      const { _id: userId } = this.chosenUser;
      await Todo.deleteAllTodos(userId);

      this.todos = await Todo.getTodos(userId);
    });

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

  this.toggleIsLoading = async (exec) => {
    this.setIsLoading(true);
    await exec();
    this.setIsLoading(false);
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
