/* api 를 호출하는 함수가 모이는 곳 입니다. */
import { ERROR, SUCCESS } from '../constants/messageAPI.js';
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

export const createUser = async({ name }) => {
  try {
    const result = await postUser({ name });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const removeUser = async({ userId }) => {
  try {
    const result = await deleteUser({ userId });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const readUserList = async() => {
  try {
    const result = await getUserList();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const createUserTodoItem = async({ userId, contents }) => {
  try {
    const result = await postUserTodoItem({ userId, contents });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const readUserTodoItems = async({ userId }) => {
  try {
    const result = await getUserTodoList({ userId });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const readUser = async({ userId }) => {
  try {
    const result = await getUser({ userId });
    return result;
  } catch (error) {
    console.log(error);
    if (error.message === ERROR.NO_USER2) {
      throw new Error(ERROR.NO_USER2);
    }
  }
};

export const updateUserTodoItemComplete = async({ userId, itemId }) => {
  try {
    const result = await putUserTodoItemComplete({ userId, itemId });
    return result;
  } catch (error) {
    console.log(error);
    if (error.message === ERROR.UPDATE_TODO_ITEM) {
      throw new Error(ERROR.UPDATE_TODO_ITEM);
    }
  }
};

export const removeUserTodoItem = async({ userId, itemId }) => {
  try {
    const result = await deleteUserTodoItem({ userId, itemId });
    return result;
  } catch (error) {
    console.log(error);
    if (error.message === ERROR.DELETE_TODO_ITEM) {
      throw new Error(ERROR.DELETE_TODO_ITEM);
    }
  }
};

export const updateUserTodoItem = async({ userId, itemId, contents }) => {
  try {
    const result = await putUserTodoItem({ userId, itemId, contents });
    return result;
  } catch (error) {
    console.log(error);
    if (error.message === ERROR.UPDATE_TODO_ITEM) {
      throw new Error(ERROR.UPDATE_TODO_ITEM);
    }
  }
};

export const removeUserTodoItemsAll = async({ userId }) => {
  try {
    const result = await deleteUserTodoItemsAll({ userId });
    result.message = SUCCESS.DELETE_TODO_ITEM_ALL;
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserTodoItemPriority = async({ userId, itemId, priority }) => {
  try {
    const result = await putUserTodoItemPriority({ userId, itemId, priority });
    return result;
  } catch (error) {
    console.log(error);
    if (error.message === ERROR.UPDATE_TODO_ITEM) {
      throw new Error(ERROR.UPDATE_TODO_ITEM);
    }
  }
};
