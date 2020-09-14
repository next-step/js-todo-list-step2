import Component from '../core/Component.js';
import State from '../core/State.js';
import UserList from './UserList.js';
import UserTitle from './UserTitle.js';
import TodoList from './TodoList.js';

export default class App extends Component {
  activeUser;

  constructor($target, $props, $children) {
    const { $userList, $userTitle, $todoList } = $children;

    super($target, $props);

    this.activeUser = new State('', this.render);

    new UserList($userList, { activeUser: this.activeUser });
    new UserTitle($userTitle, { activeUser: this.activeUser });
    new TodoList($todoList, { activeUser: this.activeUser });
  }
}
