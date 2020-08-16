import TodoTitle from './TodoTitle.js';

import { SELECTOR } from '../utils/constant.js';
import UserList from './UserList.js';
import { api } from '../utils/api.js';

function App($target) {
  this.init = async () => {
    this.$target = $target;
    this.state = {
      user: {
        name: '2sooy',
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
  };

  this.onChangeUser = async (userName) => {
    const users = await api.fetchUserList();
    const newUser = {
      name: userName,
      todos: await api.fetchUserTodo(userName),
    };

    const newState = {
      ...this.state,
      user: newUser,
      users,
    };

    this.setState(newState);
  };

  this.setState = (nextState) => {
    this.state = nextState;

    this.todoTitle.setState(this.state.user.name);
    this.userList.setState({
      users: this.state.users,
      name: this.state.user.name,
    });
  };

  this.init();
}

export default App;
