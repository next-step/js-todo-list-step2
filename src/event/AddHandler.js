import { createUser } from '../user/controller.js';
import Home from '../components/index.js';
import render from '../components/Render/index.js';
export const setUserHandler = (e) => {
  let nickname = prompt('추가하고 싶은 이름을 입력하세요');
  if (nickname === '') return;
  createUser(nickname);
  render();
};
