import TodoList from './TodoList.js';
import UserTitle from './UserTitle.js';
import UserList from './UserList.js';
import TodoInput from './TodoInput.js';
import api from './util/api.js';
import TodoCount from './TodoCount.js';
import UserRegister from './UserRegister.js';
import { MESSAGE, MEANING, ERROR_TYPE } from './util/constants.js';

export default class App {
  constructor({
    username,
    userArray,
    $targetUserTitle,
    $targetUserList,
    $targetUserRegister,
    $targetTodoInput,
    $targetTodoList,
    $targetTodoCountContainer,
  }) {
    this.username = username;
    this.userArray = userArray;
    this.$targetUserTitle = $targetUserTitle;
    this.$targetUserList = $targetUserList;
    this.$targetUserRegister = $targetUserRegister;
    this.$targetTodoInput = $targetTodoInput;
    this.$targetTodoList = $targetTodoList;
    this.$targetTodoCountContainer = $targetTodoCountContainer;

    this.userTitle = new UserTitle({
      username,
      $targetUserTitle,
    });

    this.userRegister = new UserRegister({
      username,
      $targetUserRegister,
      onClickRegister: async (newUsername) => {
        const existTodoList = await api.fetchUsers();
        const existUserList = existTodoList.map((todo) => todo.name);
        if (existUserList.includes(newUsername))
          return alert(ERROR_TYPE.EXIST_USER);
        await api.fetchTodoPost(newUsername, MESSAGE.TEMP);
        const response = await api.fetchUserTodo(newUsername);
        const data = response.todoList;
        await api.fetchTodoRemove(newUsername, data[data.length - 1]._id);
        this.userTitle.setState(newUsername);
        this.setState(newUsername);
      },
    });

    this.userList = new UserList({
      username,
      userArray,
      storeClassType: '',
      $targetUserList,
      onClickUser: (selectedUsername) => {
        this.userTitle.setState(selectedUsername);
        this.setState(selectedUsername);
      },
    });

    this.todoInput = new TodoInput({
      $targetTodoInput,
      $targetUserList,
      onInput: async (text) => {
        await api.fetchTodoPost(this.username, text);
        this.setState(this.username);
      },
    });

    this.todoList = new TodoList({
      username,
      $targetTodoList,
      onToggle: async (id) => {
        await api.fetchTodoToggle(this.username, id);
        this.setState(this.username);
      },
      onRemove: async (id) => {
        await api.fetchTodoRemove(this.username, id);
        this.setState(this.username);
      },
      onEdit: async (id, text) => {
        await api.fetchTodoUpdate(this.username, id, text);
        this.setState(this.username);
      },
      onPriority: async (id, priority) => {
        await api.fetchTodoPriority(this.username, id, priority);
        this.setState(this.username);
      },
      onInitializePriority: async (id) => {
        await api.fetchTodoPriority(this.username, id, MEANING.NOTHING);
        this.setState(this.username);
      },
    });

    this.todoCount = new TodoCount({
      username,
      $targetTodoCountContainer,
      onRemoveAll: async () => {
        await api.fetchTodoRemoveAll(this.username);
        this.setState(this.username);
      },
    });
  }

  setState(selectedUsername) {
    this.username = selectedUsername;
    this.userList.setState(this.username);
    this.todoList.setState(this.username);
    this.todoCount.setState(this.username);
  }
}
