/* api 를 호출하는 함수가 모이는 곳 입니다. */

import { postUser, getUserList } from './api.js';
import { setter } from '../store/index.js';

export const onUserCreateHandler = async (validator) => {
  const name = prompt('추가하고 싶은 이름을 입력해주세요.');
  if (name === null) return;

  await validator(name, onUserCreateHandler);

  try {
    const newUser = await postUser({ name });
    await setter.userList();
    await setter.user(newUser._id);
  } catch (err) {
    console.log(err);
  }
};

export const setUserList = async () => {
    try {
      return await getUserList();
    } catch (err) {
      console.log(err);
    }
};