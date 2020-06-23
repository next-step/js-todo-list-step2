import TodoList from './TodoList.js';
import UserList from './UserList.js';
import TodoInput from './TodoInput.js';
import api from './util/api.js';
import TodoCount from './TodoCount.js';

export default class App {
  constructor({
    username,
    userArray,
    data,
    $targetUserTitle,
    $targetUserList,
    $targetTodoInput,
    $targetTodoList,
    $targetTodoCountContainer,
    // $targetTodoCountCompleted,
  }) {
    this.username = username;
    this.userArray = userArray;
    this.data = data;
    this.$targetUserTitle = $targetUserTitle;
    this.$targetUserList = $targetUserList;
    this.$targetTodoInput = $targetTodoInput;
    this.$targetTodoList = $targetTodoList;
    this.$targetTodoCountContainer = $targetTodoCountContainer;
    // this.$targetTodoCountCompleted = $targetTodoCountCompleted;

    this.userList = new UserList({
      username,
      userArray,
      data,
      $targetUserTitle,
      $targetUserList,
      onClickUser: (user) => {
        this.setState(user);
      },
    });

    this.todoInput = new TodoInput({
      data,
      $targetTodoInput,
      onInput: async (text) => {
        await api.fetchTodoPost(this.username, text);
        this.setState(this.username);
      },
    });

    this.todoList = new TodoList({
      data,
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
    });

    this.todoCount = new TodoCount({
      data,
      username,
      $targetTodoCountContainer,
    });

    this.render();
  }

  setState(selectedUsername) {
    this.username = selectedUsername;
    // this.data = nextData;
    // console.log(this.data)
    this.userList.setState(this.username);
    this.todoList.setState(this.username);
    this.todoCount.setState(this.username);
  }

  render() {
    this.todoList.render();
  }
}
