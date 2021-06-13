import {
  setUserHandler,
  getOneUserHandler,
  deleteUserHandler,
} from './AddHandler.js';
import { $userList } from '../components/Dom/index.js';
import { $ } from '../utils/selector.js';

export const setUserCreateEvent = () => {
  const createButton = $('.user-create-button');
  const deleteButton = $('.user-delete-button');
  createButton.addEventListener('click', setUserHandler);
  deleteButton.addEventListener('click', deleteUserHandler);
  $userList.addEventListener('click', getOneUserHandler);
};
