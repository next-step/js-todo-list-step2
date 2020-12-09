import { ERROR, SUCCESS } from '../constants/messageAPI.js';
import { GET, POST, PUT, DELETE } from '../RestApi.js';
import { user, userTodoItem } from './api.js';

export const createUser = async({ name }) => {
  try {
    return await POST(user({}), { name });
  } catch (error) {
    console.log(error);
  }
};

export const removeUser = async({ userId }) => {
  try {
    await DELETE({ userId });
  } catch (error) {
    console.log(error);
  }
};

export const readUserList = async() => {
  try {
    const result = await GET(user({}));
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const createUserTodoItem = async({ userId, contents }) => {
  try {
    const result = await POST(userTodoItem(userId, {}), { contents });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const readUserTodoItems = async({ userId }) => {
  try {
    const result = await GET(userTodoItem(userId, {}));
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const readUser = async({ userId }) => {
  try {
    const result = await GET(user({ userId }));
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
    const result = await PUT(userTodoItem(userId, { itemId, toggle: true }));
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
    const result = await DELETE(userTodoItem(userId, { itemId }));
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
    const result = await PUT(userTodoItem(userId, { itemId }), { contents });
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
    const result = await DELETE(userTodoItem(userId, {}));
    result.message = SUCCESS.DELETE_TODO_ITEM_ALL;
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserTodoItemPriority = async({ userId, itemId, priority }) => {
  try {
    const result = await PUT(userTodoItem(userId, { itemId, priority: true }), { priority });
    return result;
  } catch (error) {
    console.log(error);
    if (error.message === ERROR.UPDATE_TODO_ITEM) {
      throw new Error(ERROR.UPDATE_TODO_ITEM);
    }
  }
};
