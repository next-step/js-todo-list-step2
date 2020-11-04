// core
import DOM from '../core/createElement.js';
import eventChannel from '../core/eventChannel.js';
const { done } = eventChannel;

// child components
import UserItem from './UserItem.js';

// utils & constants
import { isValidUserName } from '../utils/validators.js';
import { ACTIONS, MESSAGES } from '../constants/index.js';
const { VIEW } = ACTIONS;

export default class UserList {
  constructor() {
    this.$userList = DOM.div({
      id: 'user-list',
      onclick: onUserListClickHandler,
    });
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

const onUserListClickHandler = ({ target }) => {
  const { className, dataset } = target;

  switch (className) {
    case 'ripple':
      onChangeUserButtonClickHandler(dataset.userId);
      return;
    case 'ripple user-create-button':
      onCreateUserButtonClickHandler();
      return;
    case 'ripple user-delete-button':
      onDeleteUserButtonClickHandler();
      return;
    default:
      return;
  }
};

const onChangeUserButtonClickHandler = (id) => done(VIEW.CHANGE_USER, { id });

const onCreateUserButtonClickHandler = () => {
  const name = prompt(MESSAGES.ADD_USER);

  isValidUserName(name)
    ? done(VIEW.ADD_USER, { name })
    : alert(MESSAGES.FAILED_ADD_USER);
};

const onDeleteUserButtonClickHandler = () => {
  confirm(MESSAGES.DELETE_USER) && done(VIEW.DELETE_USER);
};
