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

  setLoading() {
    this.$userSection.innerHTML = '<h1>로딩 중...</h1>';
  }

  setState({ users, currentUser }) {
    this.$userSection.innerHTML = '';
    this.userTitle.setState({ user: users.find(({ _id }) => _id === currentUser) });
    this.userList.setState({ users, currentUser });
    this.render();
  }

  render() {
    this.$userSection.appendChild(this.userTitle.$el);
    this.$userSection.appendChild(this.userList.$el);
  }
}
