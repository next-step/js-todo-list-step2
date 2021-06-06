import { setUserHandler } from './AddHandler.js';
export const setUserCreateEvent = () => {
  const userCreateButton = document.querySelector('.user-create-button');
  userCreateButton.addEventListener('click', setUserHandler);
};
