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

export const checkUser = async() => {
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

export const createUserFacade = (name) => {
  loadingWrapper(() => createUserFunc(name));
};

const removeUserFunc = async() => {
  const userId = getter.userId();
  await removeUser({ userId });
  await initStore();
};

export const removeUserFacade = () => {
  loadingWrapper(
    () => useMiddleWare(checkUser, removeUserFunc),
  );
};

const createUserTodoItemFunc = async(contents) => {
  const userId = getter.userId();
  try {
    await createUserTodoItem({ userId, contents });
    readUserTodoItemsFunc();
  } catch (err) {
    alert(err.message);
    await initStore();
  }
};

export const createUserTodoItemFacade = (contents) => {
  loadingWrapper(
    () => useMiddleWare(checkUser, () => createUserTodoItemFunc(contents)),
  );
};

const readUserTodoItemsFunc = () => {
  const userId = getter.userId();
  readUserTodoItems({ userId })
    .then((result) => {
      setter.userItems(result);
    });
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
    () => useMiddleWare(checkUser, () => readUserFunc(userId)),
  );
};

const updateUserTodoItemCompleteFunc = async(itemId) => {
  const userId = getter.userId();
  await updateUserTodoItemComplete({ userId, itemId });
  readUserTodoItemsFunc();
};

export const updateUserTodoItemCompleteFacade = (itemId) => {
  loadingWrapper(
    () => useMiddleWare(checkUser, () => updateUserTodoItemCompleteFunc(itemId)),
  );
};

const removeUserTodoItemFunc = async(itemId) => {
  const userId = getter.userId();
  await removeUserTodoItem({ userId, itemId });
  readUserTodoItemsFunc();
};

export const removeUserTodoItemFacade = (itemId) => {
  loadingWrapper(
    () => useMiddleWare(checkUser, () => removeUserTodoItemFunc(itemId)),
  );
};

const updateUserTodoItemFunc = async(contents, itemId) => {
  const userId = getter.userId();
  await updateUserTodoItem({ userId, itemId, contents });
  readUserTodoItemsFunc();
};

export const updateUserTodoItemFacade = (contents, itemId) => {
  loadingWrapper(
    () => useMiddleWare(checkUser, () => updateUserTodoItemFunc(contents, itemId)),
  );
};

const removeUserTodoItemsAllFunc = async() => {
  const userId = getter.userId();
  const result = await removeUserTodoItemsAll({ userId });
  alert(result.message);
  readUserTodoItemsFunc();
};

export const removeUserTodoItemsAllFacade = () => {
  loadingWrapper(
    () => useMiddleWare(checkUser, removeUserTodoItemsAllFunc),
  );

};

const updateUserTodoItemPriorityFunc = async(priority, itemId) => {
  const userId = getter.userId();
  await updateUserTodoItemPriority({ userId, itemId, priority });
  readUserTodoItemsFunc();
};

export const updateUserTodoItemPriorityFacade = (priority, itemId) => {
  loadingWrapper(
    () => useMiddleWare(checkUser, () => updateUserTodoItemPriorityFunc(priority, itemId)),
  );
};

