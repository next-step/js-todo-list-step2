import UserTitle from './UserTitle.js';
import UserList from './UserList.js';
import DOM from '../core/createElement.js';

export default class UserContainer {
  constructor() {
    this.$userSection = DOM.section({ class: 'user-section' });

    this.userTitle = new UserTitle();
    this.userList = new UserList();

    this.render();
  }

  get $el() {
    return this.$userSection;
  }

  setState({ users, currentUser }) {
    this.$userSection.innerHTML = '';
    this.userTitle.setState({ user: users[currentUser] });
    this.userList.setState({ users, currentUser });
    this.render();
  }

  render() {
    this.$userSection.appendChild(this.userTitle.$el);
    this.$userSection.appendChild(this.userList.$el);
  }
}
