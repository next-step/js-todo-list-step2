import { $ } from '../../utils/common.js';
import { getFetchItems } from '../../utils/api.js';
import { UserList } from './UserList.js';

export default function Users() {
  this.$users = [];
  this.$state = 'view';
  this.$userTitle = $('#user-title');

  this.setState = (updateUsers) => {
    this.$users = updateUsers;

    const updateUserList = new UserList();
    updateUserList.setState(this.$users);
    updateUserList.$userTitle = this.$userTitle;
  }
}

new Users();
getFetchItems('users', 'GET');
