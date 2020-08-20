import {
  CURRENT_USER_ID,
  TODO_LIST_ID,
  TODO_INPUT_ID,
  TODO_COUNT_ID,
  TODO_FILTER_ID,
  TODO_MAIN_ID,
  ALL,
  COMPLETED,
  USERS_ID,
} from "../utils/data.js";
import TodoList from "./TodoList.js";
import TodoInput from "./TodoInput.js";
import TodoCount from "./TodoCount.js";
import TodoFilter from "./TodoFilter.js";
import Users from "./Users.js";
import TodoError from "./TodoError.js";
import API from "../utils/api.js";
import { validateUserData, validateTodoList } from "../utils/util.js";

export default function App() {
  this.init = async () => {
    this.state = {
      users: [],
      currentUser: {
        name: "",
        _id: "",
      },
      todoList: [],
      todoCount: 0,
      todoFilter: ALL,
    };
    await this.loadUsers();
    this.users = new Users({
      usersId: USERS_ID,
      userTitleId: CURRENT_USER_ID,
      currentUser: this.state.currentUser.name,
      currentUserId: this.state.currentUser._id,
      users: this.state.users,
      setUser: this.setUser.bind(this),
    });
    this.todoInput = new TodoInput({
      elementId: TODO_INPUT_ID,
      addTodos: this.addTodo,
    });
    this.todoList = new TodoList({
      todoList: this.state.todoList,
      elementId: TODO_LIST_ID,
      deleteTodo: this.deleteTodo,
      toggleTodo: this.toggleTodo,
      editTodo: this.editTodo,
    });
    this.todoCount = new TodoCount({
      elementId: TODO_COUNT_ID,
      todoCount: this.state.todoCount,
    });
    this.todoFilter = new TodoFilter({
      elementId: TODO_FILTER_ID,
      filterType: this.state.todoFilter,
      filterTodo: this.filterTodo,
    });
    this.todoError = new TodoError({
      elementId: TODO_MAIN_ID,
      error: null,
    });
    this.loadTodos();
  };
  this.filterTodo = ({ type }) => {
    if (type === ALL) {
      this.render();
    } else if (type === COMPLETED) {
      this.setStateForRendering({
        todoList: this.state.todoList.filter((todo) => todo.isCompleted),
        todoCount: this.state.todoList.filter((todo) => todo.isCompleted)
          .length,
        todoFilter: type,
      });
    } else {
      this.setStateForRendering({
        todoList: this.state.todoList.filter((todo) => !todo.isCompleted),
        todoCount: this.state.todoList.filter((todo) => !todo.isCompleted)
          .length,
        todoFilter: type,
      });
    }
  };
  this.toggleTodo = async ({ id }) => {
    try {
      const { name } = this.state.currentUser;
      const { _id } = await API.toggleTodoFromAPI(name, id);
      const todos = this.state.todoList.map((todo) => {
        if (todo._id === _id) {
          todo.isCompleted = !todo.isCompleted;
        }
        return todo;
      });
      validateTodoList(todos) ? this.setState(todos) : null;
    } catch (err) {
      console.log(`Cannot toggle todo..${err}`);
      this.todoError.setState(`Cannot toggle todo..${err}`);
    }
  };
  this.deleteTodo = async ({ id }) => {
    try {
      const { name } = this.state.currentUser;
      const { todoList } = await API.deleteTodoFromAPI(name, id);
      validateTodoList(todoList) ? this.setState(todoList) : null;
    } catch (err) {
      console.log(`Cannot delete todo..${err}`);
      this.todoError.setState(`Cannot delete todo..${err}`);
    }
  };
  this.addTodo = async ({ contents }) => {
    try {
      const { name } = this.state.currentUser;
      const todo = await API.addTodoListFromAPI(name, contents);
      const todos = [...this.state.todoList, todo];
      validateTodoList(todos) ? this.setState(todos) : null;
    } catch (err) {
      console.log(`Cannot add todo..${err}`);
      this.todoError.setState(`Cannot add todo..${err}`);
    }
  };
  this.editTodo = async ({ contents, _id }) => {
    try {
      const { name } = this.state.currentUser;
      const editedTodo = await API.editTodoFromAPI(name, _id, contents);
      const todos = this.state.todoList.map((todo) => {
        if (todo._id === editedTodo._id) {
          todo.contents = editedTodo.contents;
        }
        return todo;
      });
      this.setState(todos);
    } catch (err) {
      console.log(`Cannot add todo..${err}`);
      this.todoError.setState(`Cannot add todo..${err}`);
    }
  };
  this.loadUsers = async () => {
    try {
      this.state.users = await API.getUserListFromAPI();
      const currentUser = validateUserData(this.state.currentUser)
        ? this.state.currentUser
        : this.state.users[0];
      this.setUser(currentUser);
    } catch (err) {
      console.log(`Cannot read UserList..${err}`);
      this.todoError.setState(`Cannot read UserList..${err}`);
    }
  };
  this.loadTodos = async () => {
    try {
      const { name } = this.state.currentUser;
      const { todoList } = await API.getTodoListFromAPI(name);
      validateTodoList(todoList) ? this.setState(todoList) : null;
    } catch (err) {
      console.log(`Cannot read todoList from user..${err}`);
      this.todoError.setState(`Cannot read todoList from user..${err}`);
    }
  };
  this.setUser = (user) => {
    this.state.currentUser = user;
    this.todoList ? this.loadTodos() : null;
  };
  this.setState = (todoList) => {
    this.state.todoList = todoList;
    this.state.todoCount = this.state.todoList.length;
    this.render();
  };
  this.setStateForRendering = ({
    users: users,
    todoList: todoList,
    todoCount: todoCount,
    todoFilter: todoFilter,
  }) => {
    this.users.setState(users);
    this.todoList.setState(todoList);
    this.todoCount.setState(todoCount);
    this.todoFilter.setState(todoFilter);
  };
  this.render = () => {
    this.users.setState({
      users: this.state.users,
      currentUser: this.state.currentUser.name,
      currentUserId: this.state.currentUser._id,
    });
    this.todoList.setState(this.state.todoList);
    this.todoCount.setState(this.state.todoCount);
    this.todoFilter.setState(this.state.todoFilter);
  };
  try {
    if (!new.target) {
      throw new Error(`Invalid function call ${this}`);
    }
    this.init();
  } catch {}
}
