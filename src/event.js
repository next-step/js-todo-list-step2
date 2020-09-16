import { validateUserName } from './utils.js';
import { onUserCreateHandler } from './endpoint/service.js';
import { setter } from './store/index.js';
import { loadingWrapper } from './utils.js';

export const setEvent = () => {
  const $userCreateButton = document.querySelector('.user-create-button');
  const $userChangeButton = document.querySelector('#user-list');

  $userCreateButton.addEventListener('click', () => onUserCreateHandler(validateUserName));
  $userChangeButton.addEventListener('click', (event) => {
    const userId = event.target.dataset.index;
    userId && loadingWrapper(() => setter.user(userId));
  });
};
