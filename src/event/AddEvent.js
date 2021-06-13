import { setUserHandler, getOneUserHandler } from './AddHandler.js';
import { $userList } from '../components/Dom/index.js';
import { $ } from '../utils/selector.js';

export const setUserCreateEvent = () => {
  const createButton = $('.user-create-button');
  createButton.addEventListener('click', setUserHandler);
  $userList.addEventListener('click', getOneUserHandler);
};
