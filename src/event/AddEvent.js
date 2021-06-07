import { setUserHandler, getOneUserHandler } from './AddHandler.js';
export const setUserCreateEvent = () => {
  const userCreateButton = document.querySelector('.user-create-button');
  const userListButton = document.querySelector('.user-list');
  userCreateButton.addEventListener('click', setUserHandler);
  userListButton.addEventListener('click', getOneUserHandler);
};
