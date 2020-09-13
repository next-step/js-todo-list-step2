import Component from '../core/Component.js';
import State from '../core/State.js';
import UserList from './UserList.js';

export default class App extends Component {
  selectedUser;
  constructor($target, $props, $children) {
    const { $userList } = $children;

    super($target, $props);

    this.selectedUser = new State('');

    new UserList($userList, { selectedUser: this.selectedUser });
  }
}
