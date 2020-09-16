import { postUser } from './endpoint/api.js';
import { setter } from './store/index.js';

const onUserCreateHandler = async () => {
  const name = prompt('추가하고 싶은 이름을 입력해주세요.');
  if (!name) return;

  await validateUserName(name);

  try {
    const newUser = await postUser({ name });
    await setter.userList(newUser);
  } catch (err) {
    console.log(err);
  }
};

const validateUserName = async (name) => {
  if (name.length > 1)
    return true;

  alert('User 의 이름은 최소 2글자 이상이어야 합니다.');
  await onUserCreateHandler();
};

export const setEvent = () => {
  const $userCreateButton = document.querySelector('.user-create-button');

  $userCreateButton.addEventListener('click', onUserCreateHandler);
};
