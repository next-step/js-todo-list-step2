import DOM from '../core/createElement.js';
import UserItem from './UserItem.js';
import { onUserListClickHandler } from '../actions/index.js';

export default class UserList {
  constructor() {
    this.$userList = DOM.div({ id: 'user-list', onclick: onUserListClickHandler });
    this.$userCreateButton = DOM.button({
      class: 'ripple user-create-button',
      innerText: '+ 유저 생성',
    });
    this.$userDeleteButton = DOM.button({
      class: 'ripple user-delete-button',
      innerText: '- 유저 삭제',
    });
    this.render();
  }

  get $el() {
    return this.$userList;
  }

  setState({ users, currentUser }) {
    this.$userList.innerHTML = '';
    this.render(
      users.map(({ _id, name }) =>
        UserItem({ _id, name, isActive: currentUser === _id })
      )
    );
  }

  render(userItems = []) {
    userItems.forEach((userItem) => this.$userList.appendChild(userItem));
    this.$userList.appendChild(this.$userCreateButton);
    this.$userList.appendChild(this.$userDeleteButton);
  }
}
