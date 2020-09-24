/* api 를 호출하는 함수가 모이는 곳 입니다. */
import { ERROR, SUCCESS }  from '../constants/messageAPI.js';
import {
  postUser,
  getUserList,
  deleteUser,
  postUserTodoItem,
  getUserTodoList,
  getUser,
  putUserTodoItemComplete,
  deleteUserTodoItem,
  putUserTodoItem,
  deleteUserTodoItemsAll,
  putUserTodoItemPriority,
} from './api/user.js';

export const createUser = async ({ name }) => {
  const result = await postUser({ name });
  // 에러 처리
  return result;
};

export const removeUser = async ({ userId }) => {
  const result = await deleteUser({ userId });
  // 에러처리
  return result;
};

export const readUserList = async () => {
   const result = await getUserList();
   // 에러 처리
   return result;
};

export const createUserTodoItem = async ({ userId, contents }) => {
  const result = await postUserTodoItem({ userId, contents });
  if (result.message === ERROR.NO_USER ) {
    throw new Error(ERROR.NO_USER);
  }
  return result;
};

export const readUserTodoItems = async ({ userId }) => {
  const result = await getUserTodoList({ userId });
  if (result.message === ERROR.NO_USER2) {
    throw new Error(ERROR.NO_USER2);
  }
  return result;
};

export const readUser = async ({ userId }) => {
  const result = await getUser({ userId });
  if (result.message === ERROR.NO_USER2) {
    throw new Error(ERROR.NO_USER2);
  }
  return result;
};

export const updateUserTodoItemComplete = async ({ userId, itemId }) => {
  const result = await putUserTodoItemComplete({ userId, itemId });
  if (result.message === ERROR.NO_USER3) {
    throw new Error(ERROR.NO_USER3);
  }
  if (result.message === ERROR.UPDATE_TODO_ITEM) {
    throw new Error(ERROR.UPDATE_TODO_ITEM);
  }
  return result;
};

export const removeUserTodoItem = async ({ userId, itemId }) => {
  const result = await deleteUserTodoItem({ userId, itemId });
  if (result.message === ERROR.NO_USER3) {
    throw new Error(ERROR.NO_USER3);
  }
  if (result.message === ERROR.DELETE_TODO_ITEM) {
    throw new Error(ERROR.DELETE_TODO_ITEM);
  }
  return result;
};

export const updateUserTodoItem = async ({ userId, itemId, contents }) => {
  const result = await putUserTodoItem({ userId, itemId, contents });
  if (result.message === ERROR.UPDATE_TODO_ITEM) {
    throw new Error(ERROR.UPDATE_TODO_ITEM);
  }
  if (result.message === ERROR.NO_USER3) {
    throw new Error(ERROR.NO_USER3);
  }

  return result;
};

export const removeUserTodoItemsAll = async ({ userId }) => {
  const result = await deleteUserTodoItemsAll({ userId });
  if (result.success) {
    result.message = SUCCESS.DELETE_TODO_ITEM_ALL;
  }
  if (result.message === ERROR.NO_USER3) {
    throw new Error(ERROR.NO_USER3);
  }
  return result;
};

export const updateUserTodoItemPriority = async ({ userId, itemId, priority }) => {
  const result = await putUserTodoItemPriority({ userId, itemId, priority });
  if (result.message === ERROR.UPDATE_TODO_ITEM) {
    throw new Error(ERROR.UPDATE_TODO_ITEM);
  }
  if (result.message === ERROR.NO_USER3) {
    throw new Error(ERROR.NO_USER3);
  }
  return result;
};
