import { createUser, getUser } from '../user/controller.js';
export const setUserHandler = (e) => {
  let nickname = prompt('추가하고 싶은 이름을 입력하세요');
  if (nickname === '') return;
  createUser(nickname);
};
