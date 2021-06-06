import { createUser } from '../user/controller.js';
import render from '../components/Render/index.js';
import { timer } from '../utils/timer.js';
export const setUserHandler = async (e) => {
  let nickname = prompt('추가하고 싶은 이름을 입력하세요');
  if (nickname === '') return;
  createUser(nickname);
  timer(render, 2000);
};
