import { validateUserName } from './utils.js';
import { onUserCreateHandler } from './endpoint/service.js';

export const setEvent = () => {
  const $userCreateButton = document.querySelector('.user-create-button');
  $userCreateButton.addEventListener('click', () => onUserCreateHandler(validateUserName));
};
