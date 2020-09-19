/* api 를 호출하는 함수가 모이는 곳 입니다. */

import { postUser, getUserList, deleteUser, postUserItem, getUserItems, getUser } from './api.js';
import { setter } from '../store/index.js';
import { loadingWrapper } from '../utils.js';

export const onUserCreateHandler = async (validator) => {
  const name = prompt('추가하고 싶은 이름을 입력해주세요.');
  if (name === null) return;

  await validator(name, onUserCreateHandler);

  try {
    const newUser = await postUser({ name });
    await loadingWrapper(async () => {
      await setter.userList();
      await setter.user(newUser._id);
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteUserService = async (userId) => {
  const confirm = window.confirm('유저를 정말로 삭제하시겠습니까?');
  if (!confirm) return;
  try {
    const result = await deleteUser({ userId });
    alert(result.message);
  } catch (err) {
    console.log(err);
  }
};

export const getUserListService = async () => {
  try {
    return await getUserList();
  } catch (err) {
    console.log(err);
  }
};

export const postUserItemService = async ({ userId, contents }) => {
  try {
    const result = await postUserItem({ userId, contents });
    return result;
  } catch (err) {
    alert(err);
  }
};

export const getUserItemsService = async ({ userId }) => {
  try {
    const result = await getUserItems({ userId });
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const getUserService = async ({ userId }) => {
  try {
    const result = await getUser({ userId });
    return result;
  } catch (err) {
    console.log(err.message);
  }
};