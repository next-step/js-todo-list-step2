import { createUser } from '../user/controller.js';
import render from '../components/Render/index.js';
import { timer } from '../utils/timer.js';
export const setUserHandler = async (e) => {
  let nickname = prompt('추가하고 싶은 이름을 입력하세요');
  if (nickname === '') return;
  if (nickname.length < 2) {
    alert('user의 이름은 최소 2글자 이상이어야 합니다.');
  }
  createUser(nickname);
  timer(render, 2000);
};
