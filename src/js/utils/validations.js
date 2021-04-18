import { ERROR_TYPE } from './errors.js';

export const isAvailableUserName = (userName) => {
  if (userName.length < 2) throw ERROR_TYPE.NOT_VALIDATE_USERNAME;
};

export const isAvaliableTodo = (todo) => {
  if (todo.length < 2) throw ERROR_TYPE.NOT_VALIDATE_TODO;
};

export const isRemovableList = (todoList) => {
  if (!todoList || todoList.length === 0)
    throw ERROR_TYPE.NOT_VALIDATE_TODOLIST;
};
