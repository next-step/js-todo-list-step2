import DOM from '../core/createElement.js';
import UserItem from './UserItem.js';
import { onCreateUserButtonClick, onDeleteUserButtonClick } from '../actions/index.js';

export default class UserList {
  constructor() {
    this.$userList = DOM.div({ id: 'user-list' });
    this.$userCreateButton = DOM.button({
      class: 'ripple user-create-button',
      innerText: '+ 유저 생성',
      onclick: onCreateUserButtonClick,
    });
    this.$userDeleteButton = DOM.button({
      class: 'ripple user-delete-button',
      innerText: '- 유저 삭제',
      onclick: onDeleteUserButtonClick,
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
        ({ _id, name }) => new UserItem({ _id, name, isActive: currentUser === _id })
      )
    );
  }

  render(userItems = []) {
    userItems.forEach((userItem) => this.$userList.appendChild(userItem.$el));
    this.$userList.appendChild(this.$userCreateButton);
    this.$userList.appendChild(this.$userDeleteButton);
  }
}
