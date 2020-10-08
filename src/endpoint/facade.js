import {
  readUser,
  removeUser,
  createUser,
  createUserTodoItem,
  readUserTodoItems,
  readUserList,
  updateUserTodoItemComplete,
  removeUserTodoItem,
  updateUserTodoItem,
  removeUserTodoItemsAll,
  updateUserTodoItemPriority,
} from './service.js';
import { getter, initStore, setter } from '../store/index.js';
import { ERROR } from '../constants/messageAPI.js';
import { loadingWrapper, useMiddleWare } from '../utils.js';

export const userCheck = async() => {
  const userId = getter.userId();
  try {
    await readUser({ userId });
  } catch (error) {
    setter.user(null);
    throw new Error(ERROR.NO_USER);
  }
};

export const createUserFunc = async(name) => {
  const user = await createUser({ name });
  await readUserListFacade();
  await setter.user(user);
};

export const createUserFacade = async(name) => {
  loadingWrapper(() => createUserFunc(name));
};

const removeUserFunc = async() => {
  const userId = getter.userId();
  await removeUser({ userId });
  await initStore();
};

export const removeUserFacade = () => {
  loadingWrapper(
    () => useMiddleWare(userCheck, removeUserFunc),
  );
};

const createUserTodoItemFunc = async(contents) => {
  const userId = getter.userId();
  try {
    await createUserTodoItem({ userId, contents });
    await readUserTodoItemsFunc();
  } catch (err) {
    alert(err.message);
    await initStore();
  }
};

export const createUserTodoItemFacade = (contents) => {
  loadingWrapper(
    () => useMiddleWare(userCheck, () => createUserTodoItemFunc(contents)),
  );
};

const readUserTodoItemsFunc = async() => {
  const userId = getter.userId();
  const result = await readUserTodoItems({ userId });
  setter.userItems(result);
};

export const readUserListFacade = async() => {
  const result = await readUserList();
  setter.userList(result);
};

const readUserFunc = async(userId) => {
  try {
    const user = await readUser({ userId });
    setter.user(user.message ? null : user);
  } catch (error) {
    alert(error.message);
    setter.user(null);
  }
};

export const readUserFacade = (userId) => {
  setter.user({ _id: userId });
  loadingWrapper(
    () => useMiddleWare(userCheck, () => readUserFunc(userId)),
  );
};

const updateUserTodoItemCompleteFunc = async(itemId) => {
  const userId = getter.userId();
  await updateUserTodoItemComplete({ userId, itemId });
  await readUserTodoItemsFunc();
};

export const updateUserTodoItemCompleteFacade = (itemId) => {
  loadingWrapper(
    () => useMiddleWare(userCheck, () => updateUserTodoItemCompleteFunc(itemId)),
  );
};

const removeUserTodoItemFunc = async(itemId) => {
  const userId = getter.userId();
  await removeUserTodoItem({ userId, itemId });
};

export const removeUserTodoItemFacade = (itemId) => {
  loadingWrapper(
    () => useMiddleWare(userCheck, () => removeUserTodoItemFunc(itemId)),
  );
};

const updateUserTodoItemFunc = async(contents, itemId) => {
  const userId = getter.userId();
  await updateUserTodoItem({ userId, itemId, contents });
  await readUserTodoItemsFunc();
};

export const updateUserTodoItemFacade = (contents, itemId) => {
  loadingWrapper(
    () => useMiddleWare(userCheck, () => updateUserTodoItemFunc(contents, itemId)),
  );
};

const removeUserTodoItemsAllFunc = async() => {
  const userId = getter.userId();
  const result = await removeUserTodoItemsAll({ userId });
  alert(result.message);
  await readUserTodoItemsFunc();
};

export const removeUserTodoItemsAllFacade = () => {
  loadingWrapper(
    () => useMiddleWare(userCheck, removeUserTodoItemsAllFunc),
  );
};

const updateUserTodoItemPriorityFunc = async(priority, itemId) => {
  const userId = getter.userId();
  await updateUserTodoItemPriority({ userId, itemId, priority });
  await readUserTodoItemsFunc();
};

export const updateUserTodoItemPriorityFacade = (priority, itemId) => {
  loadingWrapper(
    () => useMiddleWare(userCheck, () => updateUserTodoItemPriorityFunc(priority, itemId)),
  );
};

