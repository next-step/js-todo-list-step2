import { createUser } from '../user/controller.js';
import render from '../components/Render/index.js';

export const setUserHandler = async (e) => {
  let nickname = prompt('추가하고 싶은 이름을 입력하세요');
  if (nickname === '') return;
  createUser(nickname);
  setTimeout(render, 2000);
};
