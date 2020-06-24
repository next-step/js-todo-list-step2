import TodoList from './TodoList.js';
import UserList from './UserList.js';
import TodoInput from './TodoInput.js';
import api from './util/api.js';
import TodoCount from './TodoCount.js';

export default class App {
  constructor({
    username,
    userArray,
    $targetUserContainer,
    $targetTodoInput,
    $targetTodoList,
    $targetTodoCountContainer,
  }) {
    this.username = username;
    this.userArray = userArray;
    this.$targetUserContainer = $targetUserContainer;
    this.$targetTodoInput = $targetTodoInput;
    this.$targetTodoList = $targetTodoList;
    this.$targetTodoCountContainer = $targetTodoCountContainer;

    this.userList = new UserList({
      username,
      userArray,
      $targetUserContainer,
      onClickUser: (selectedUsername) => {
        this.setState(selectedUsername);
      },
    });

    this.todoInput = new TodoInput({
      $targetTodoInput,
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
    });

    this.todoCount = new TodoCount({
      username,
      $targetTodoCountContainer,
    });

    this.render();
  }

  setState(selectedUsername) {
    this.username = selectedUsername;
    this.userList.setState(this.username);
    this.todoList.setState(this.username);
    this.todoCount.setState(this.username);
  }

  async render() {
    await api.fetchTodoPost(this.username, "makeUser")
    const response = await api.fetchUserTodo(this.username);
    const data = response.todoList;
    await api.fetchTodoRemove(this.username, data[data.length-1]._id)
    this.todoList.render();
  }
}
