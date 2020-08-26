import TodoTitle from './TodoTitle.js';
import UserList from './UserList.js';
import TodoList from './TodoList.js';
import TodoInput from './TodoInput.js';
import TodoCount from './TodoCount.js';
import TodoTab from './TodoTab.js';
import TodoClearButton from './TodoClearButton.js';
import LoadingView from './LoadingView.js';

import { SELECTOR, CLASS_NAME } from '../utils/constants.js';
import { api } from '../utils/api.js';
import { checkTarget, checkAppState } from '../utils/validator.js';

function App($target) {
  this.init = async () => {
    checkTarget($target);
    this.$target = $target;

    this.state = {
      user: {
        name: '',
        todos: [],
      },
      users: [],
      selectedTab: CLASS_NAME.ALL,
    };

    try {
      this.state.users = await api.fetchUserList();
    } catch (err) {
      console.error(err);
    }
    checkAppState(this.state);

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

    this.todoInput = new TodoInput({
      $target: document.querySelector(SELECTOR.TODO_INPUT),
      userName: this.state.user.name,
      onAddTodo: this.onAddTodo,
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
      onChangePriority: this.onChangePriority,
    });

    this.todoCount = new TodoCount({
      $target: document.querySelector(SELECTOR.TODO_COUNT),
      todoCountState: {
        todos: this.state.user.todos,
        selectedTab: this.state.selectedTab,
      },
    });

    this.todoTab = new TodoTab({
      $target: document.querySelector(SELECTOR.TODO_TAB),
      todoTabState: {
        userName: this.state.user.name,
        selectedTab: this.state.selectedTab,
      },
      onChangeTab: this.onChangeTab,
    });

    this.todoClearButton = new TodoClearButton({
      $target: document.querySelector(SELECTOR.TODO_CLEAR_BUTTON),
      userName: this.state.user.name,
      onDeleteAllTodo: this.onDeleteAllTodo,
    });

    this.loadingView = new LoadingView({
      $target: document.querySelector(SELECTOR.LOADING_VIEW),
    });
  };

  this.onChangeUser = async (userName) => {
    try {
      const newState = await this.fetchState(userName);
      this.setState(newState);
    } catch (err) {
      console.error(err);
    }
  };

  this.onAddTodo = async (userName, contents) => {
    try {
      await api.addTodo(userName, contents);
      const newState = await this.fetchState(userName);
      this.setState(newState);
    } catch (err) {
      console.error(err);
    }
  };

  this.onToggleTodo = async (userName, todoId) => {
    try {
      await api.toggleTodo(userName, todoId);
      const newState = await this.fetchState(userName);
      this.setState(newState);
    } catch (err) {
      console.error(err);
    }
  };

  this.onRemoveTodo = async (userName, todoId) => {
    try {
      await api.deleteTodo(userName, todoId);
      const newState = await this.fetchState(userName);
      this.setState(newState);
    } catch (err) {
      console.error(err);
    }
  };

  this.onEditTodo = async (userName, todoId, contents) => {
    try {
      await api.editTodoContent(userName, todoId, contents);
      const newState = await this.fetchState(userName);
      this.setState(newState);
    } catch (err) {
      console.error(err);
    }
  };

  this.onChangePriority = async (userName, todoId, priority) => {
    try {
      await api.editTodoPriority(userName, todoId, priority);
      const newState = await this.fetchState(userName);
      this.setState(newState);
    } catch (err) {
      console.error(err);
    }
  };

  this.onChangeTab = (selectedTab) => {
    const newState = {
      ...this.state,
      selectedTab,
    };

    this.setState(newState);
  };

  this.onDeleteAllTodo = async (userName) => {
    try {
      await api.deleteAllTodo(userName);
      const newState = await this.fetchState(userName);
      this.setState(newState);
    } catch (err) {
      console.error(err);
    }
  };

  this.fetchState = async (userName) => {
    this.loadingView.setState(true);

    const users = await api.fetchUserList();
    const userInfo = await api.fetchUserTodo(userName);

    this.loadingView.setState(false);

    const user = {
      name: userName,
      todos: userInfo.todoList || [],
    };

    const newState = {
      ...this.state,
      user,
      users,
    };

    return newState;
  };

  this.setState = (nextState) => {
    checkAppState(nextState);
    this.state = nextState;

    this.todoTitle.setState(this.state.user.name);
    this.userList.setState({
      users: this.state.users,
      name: this.state.user.name,
    });
    this.todoInput.setState(this.state.user.name);
    this.todoList.setState({
      name: this.state.user.name,
      todos: this.state.user.todos,
      selectedTab: this.state.selectedTab,
    });
    this.todoCount.setState({
      todos: this.state.user.todos,
      selectedTab: this.state.selectedTab,
    });
    this.todoTab.setState(this.state.selectedTab);
    this.todoClearButton.setState(this.state.user.name);
  };

  this.init();
}

export default App;
