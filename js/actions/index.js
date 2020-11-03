import { MESSAGES } from '../constants/index.js';
import { isValidUserName } from '../utils/validators.js';
import eventChannel from '../core/eventChannel.js';

const { done, when } = eventChannel;

export const VIEW = {
  INIT: 'view/init',
  ADD_USER: 'view/addUser',
  DELETE_USER: 'view/deleteUser',
  CHANGE_USER: 'view/changeUser',
  ADD_TODO: 'view/addTodo',
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
  confirm(MESSAGES.DELETE_USER) && done(VIEW.DELETE_USER);
};

export const onChangeUserButtonClick = (e) => {
  done(VIEW.CHANGE_USER, { id: e.target.dataset.userId });
};

export const onCreateTodoInputEnterKeypress = ({ key, target }) => {
  if (key === 'Enter') {
    done(VIEW.ADD_TODO, { contents: target.value });
    target.value = '';
  }
};
