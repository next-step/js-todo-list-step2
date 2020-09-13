import Component from '../core/Component.js';
import UserList from './UserList.js';

export default class App extends Component {
  constructor($target, $props, $children) {
    const { $userList } = $children;

    super($target, $props);

    new UserList($userList);
  }
}
