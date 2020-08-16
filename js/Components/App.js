import TodoTitle from './TodoTitle.js';
import UserList from './UserList.js';

import { SELECTOR } from '../utils/constant.js';

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

    this.todoTitle = new TodoTitle({
      $target: document.querySelector(SELECTOR.TODO_TITLE),
      name: this.state.user.name,
    });
  };

  this.init();
}

export default App;
