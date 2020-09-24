import { loadingWrapper } from './utils.js';
import { getter, initStore, setter } from './store/index.js';
import {
  createUser,
  removeUserTodoItemsAll,
  createUserTodoItem,
  updateUserTodoItemComplete,
  updateUserTodoItem,
  removeUserTodoItem,
  updateUserTodoItemPriority,
  removeUser,
} from './endpoint/service.js';
import { ERROR } from './constants/messageAPI.js';

export const createUserHandler = async (validator) => {
  const name = prompt('추가하고 싶은 이름을 입력해주세요.');
  if (name === null) return;

  await validator(name, createUserHandler);

  try {
    const user = await createUser({ name });
    loadingWrapper(async () => {
      await setter.userList();
      await setter.user(user._id);
    });
  }
  catch (err) {
    alert(err.message);
  }
};

export const deleteUserTodoItemsAllHandler = async () => {
  const userId = getter.userId();
  try {
    const result = await removeUserTodoItemsAll({ userId });
    await setter.userItems(userId);
    alert(result.message);
  }
  catch (err) {
    if (err.message === ERROR.NO_USER3) {
      await initStore();
    }
  }
};

export const addUserTodoItemHandler = async ({ target, target: { value }, key }) => {
  if (value !== '' && key === 'Enter') {
    const userId = getter.userId();
    try {
      await createUserTodoItem({ userId, contents: value });
      await setter.userItems(userId);
    }
    catch (err) {
      if (err.message = ERROR.NO_USER) {
        // something
      }
      alert(err.message);
      await initStore();
    }
    finally {
      target.value = '';
    }
  }
};

export const toggleCompleteHandler = async (target) => {
  const itemId = target.closest('li').dataset.todoIdx;
  const userId = getter.userId();
  try {
    await updateUserTodoItemComplete({ userId, itemId });
    await setter.userItems(userId);
  }
  catch (err) {
    alert(err.message);
    if (err.message === ERROR.NO_USER3) {
      await initStore();
    }
    if (err.message === ERROR.NO_TODO_ITEM) {
      await setter.userItems(userId);
    }
  }
};

export const deleteTodoItemHandler = async (target) => {
  const userId = getter.userId();
  const itemId = target.closest('li').dataset.todoIdx;
  try {
    await removeUserTodoItem({ userId, itemId });
    await setter.userItems(userId);
  }
  catch (err) {
    alert(err.message);
    if (err.message === ERROR.DELETE_TODO_ITEM) {
      await setter.userItems(userId);
    }
    if (err.message === ERROR.NO_USER3) {
      await initStore();
    }
  }
};


export const editModeHandler = ({ target }, editItem) => {
  if (target.dataset.component === 'todo-label') {
    const itemId = target.closest('li').dataset.todoIdx;
    if (editItem.id !== -1 && editItem.id !== itemId) {
      setter.itemMode(editItem.id, 'view');
      editItem.component.render();
    }
    setter.itemMode(itemId, 'edit');
    return itemId;
  }
};

export const editItemContentsHandler = async ({ target, target: { dataset, value }, key }) => {
  if (dataset.component === 'editMode' && value !== '' && key === 'Enter') {
    const itemId = target.closest('li').dataset.todoIdx;
    const userId = getter.userId();
    const contents = value;

    try {
      await updateUserTodoItem({ userId, itemId, contents });
      await setter.userItems(userId);
    }
    catch (err) {
      alert(err.message);
      if (err.message === ERROR.UPDATE_TODO_ITEM) {
        await setter.userItems(userId);
      }
      if (err.message === ERROR.NO_USER3) {
        await initStore();
      }
    }
  }
};

export const escapeEditHandler = async ({ key, target: { dataset } }, editItem) => {
  if (dataset.component === 'editMode' && key === 'Escape') {
    setter.itemMode(editItem.id, 'view');
    editItem.component.render();
    editItem.id = -1;
    editItem.component = undefined;
  }
};

export const setPriorityHandler = async ({ target, target: { dataset, value } }) => {
  if (dataset.component === 'todoPriority') {
    const itemId = target.closest('li').dataset.todoIdx;
    const userId = getter.userId();
    const priority = value;
    try {
      const result = await updateUserTodoItemPriority({ userId, itemId, priority });
      setter.userItem(itemId, result);
      return itemId;
    }
    catch (err) {
      alert(err.message);
      if (err.message === ERROR.UPDATE_TODO_ITEM) {
        await setter.userItems(userId);
      }
      if (err.message === ERROR.NO_USER3) {
        await initStore();
      }
    }
  }
};

export const setUserHandler = (event) => {
  const userId = event.target.dataset.index;
  userId && loadingWrapper(() => setter.user(userId));
};

export const deleteUserHandler = async (event) => {
  if (event.target.dataset.component === 'user-delete') {
    const confirm = window.confirm('유저를 정말로 삭제하시겠습니까?');
    if (!confirm) return;
    try {
      const userId = getter.userId();
      loadingWrapper(async () => {
        await removeUser({ userId });
        await initStore();
      });
    }
    catch (err) {
      alert(err.message);
    }
  }
};