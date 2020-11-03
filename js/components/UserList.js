import DOM from '../core/createElement.js';
import UserItem from './UserItem.js';
import { onCreateUserButtonClick } from '../actions/index.js';

export default class UserList {
  constructor() {
    this.$userList = DOM.div({ id: 'user-list' });
    this.$userCreateButton = DOM.button({
      class: 'ripple user-create-button',
      innerText: '+ 유저 생성',
      onclick: onCreateUserButtonClick,
    });
    this.render();
  }

  get $el() {
    return this.$userList;
  }

  setState({ users, currentUser }) {
    this.$userList.innerHTML = '';
    this.render(
      users.map(
        ({ _id, name }) =>
          new UserItem({ _id, name, isActive: currentUser === _id })
      )
    );
  }

  render(userItems = []) {
    userItems.forEach((userItem) => this.$userList.appendChild(userItem.$el));
    this.$userList.appendChild(this.$userCreateButton);
  }
}
