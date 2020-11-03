import { MESSAGES } from '../constants/index.js';
import { isValidUserName } from '../utils/validators.js';
import eventChannel from '../core/eventChannel.js';

const { done, when } = eventChannel;

export const VIEW = {
  INIT: 'view/init',
  ADD_USER: 'view/addUser',
  DELETE_USER: 'view/deleteUser',
  CHANGE_USER: 'view/changeUser',
};

export const STORE = {
  UPDATE: 'store/update',
};

export const onCreateUserButtonClick = () => {
  const name = prompt(MESSAGES.ADD_USER);

  isValidUserName(name)
    ? done(VIEW.ADD_USER, { name })
    : alert(MESSAGES.FAILED_ADD_USER);
};

export const onDeleteUserButtonClick = () => {
  const $userTitle = document.querySelector('#user-title');

  confirm(MESSAGES.DELETE_USER) &&
    done(VIEW.DELETE_USER, { id: $userTitle.dataset.userId });
};

export const onChangeUserButtonClick = (e) => {
  done(VIEW.CHANGE_USER, { id: e.target.dataset.userId });
};
