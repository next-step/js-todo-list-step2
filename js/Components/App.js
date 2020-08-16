import TodoTitle from './TodoTitle.js';
import UserList from './UserList.js';
import TodoList from './TodoList.js';

import { SELECTOR } from '../utils/constant.js';
import { api } from '../utils/api.js';

function App($target) {
  this.init = async () => {
    this.$target = $target;
    this.state = {
      user: {
        name: '',
        todos: [],
      },
      users: [],
      selectedTab: 'all',
    };

    this.state.users = await api.fetchUserList();

    this.todoTitle = new TodoTitle({
      $target: document.querySelector(SELECTOR.TODO_TITLE),
      name: this.state.user.name,
    });

    this.userList = new UserList({
      $target: document.querySelector(SELECTOR.USER_LIST),
      userListState: {
        name: this.state.user.name,
        users: this.state.users,
      },
      onChangeUser: this.onChangeUser,
    });

    this.todoList = new TodoList({
      $target: document.querySelector(SELECTOR.TODO_LIST),
      todoListState: {
        name: this.state.user.name,
        todos: this.state.user.todos,
        selectedTab: this.state.selectedTab,
      },
      onToggleTodo: this.onToggleTodo,
      onRemoveTodo: this.onRemoveTodo,
      onEditTodo: this.onEditTodo,
    });
  };

  this.onChangeUser = async (userName) => {
    const users = await api.fetchUserList();
    const userInfo = await api.fetchUserTodo(userName);
    const newUser = {
      name: userName,
      todos: userInfo.todoList || [],
    };

    const newState = {
      ...this.state,
      user: newUser,
      users,
    };

    this.setState(newState);
  };

  this.onToggleTodo = async (userName, todoId) => {
    await api.toggleTodo(userName, todoId);
    const newState = await this.fetchState(userName);

    this.setState(newState);
  };

  this.onRemoveTodo = async (userName, todoId) => {
    await api.deleteTodo(userName, todoId);
    const newState = await this.fetchState(userName);

    this.setState(newState);
  };

  this.onEditTodo = async (userName, todoId, contents) => {
    await api.editTodoContent(userName, todoId, contents);
    const newState = await this.fetchState(userName);

    this.setState(newState);
  };

  this.fetchState = async (userName) => {
    const users = await api.fetchUserList();
    const userInfo = await api.fetchUserTodo(userName);
    const newUser = {
      name: userName,
      todos: userInfo.todoList || [],
    };

    const newState = {
      ...this.state,
      user: newUser,
      users,
    };

    return newState;
  };

  this.setState = (nextState) => {
    this.state = nextState;

    this.todoTitle.setState(this.state.user.name);
    this.userList.setState({
      users: this.state.users,
      name: this.state.user.name,
    });
    this.todoList.setState({
      name: this.state.user.name,
      todos: this.state.user.todos,
      selectedTab: this.state.selectedTab,
    });
  };

  this.init();
}

export default App;
