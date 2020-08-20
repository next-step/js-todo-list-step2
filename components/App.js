import {
  CURRENT_USER_ID,
  TODO_LIST_ID,
  TODO_INPUT_ID,
  TODO_COUNT_ID,
  TODO_FILTER_ID,
  ALL,
  COMPLETED,
  USER,
  USERS_ID,
} from "../utils/data.js";
import TodoList from "./TodoList.js";
import TodoInput from "./TodoInput.js";
import TodoCount from "./TodoCount.js";
import TodoFilter from "./TodoFilter.js";
import API from "../utils/api.js";
import Users from "./Users.js";

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
    await this.loadUsers();
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
  this.toggleTodo = ({ id }) => {
    this.setState(
      this.state.todoList.map((todo) => {
        if (todo.id === id) {
          todo.isCompleted = !todo.isCompleted;
        }
        return todo;
      })
    );
  };
  this.deleteTodo = ({ id }) => {
    this.setState(this.state.todoList.filter((todo) => todo.id !== id));
  };
  this.addTodo = async ({ content }) => {
    const todos = await API.addTodoListFromAPI(USER, content);
    this.setState([...this.state.todoList, todos]);
  };
  this.editTodo = ({ content, id }) => {
    this.setState(
      this.state.todoList.map((todo) => {
        if (todo.id === id) {
          todo.content = content;
        }
        return todo;
      })
    );
  };
  this.loadUsers = async () => {
    this.state.users = await API.getUserListFromAPI();
    this.setUser(this.state.users[0]);
  };
  this.loadTodos = async () => {
    const { name } = this.state.currentUser;
    const { todoList } = await API.getTodoListFromAPI(name);
    this.setState(todoList);
  };
  this.setUser = (user) => {
    user.hasOwnProperty("name") || user.hasOwnProperty("_id")
      ? (this.state.currentUser = user)
      : this.state.currentUser;
    this.loadTodos();
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
