import { FILTER } from '../constants/index.js';

export const filterTodoList = (todos, currentFilter) => {
  switch (currentFilter) {
    case FILTER.ACTIVE:
      return todos.filter((todo) => todo.isCompleted === false);
    case FILTER.COMPLETED:
      return todos.filter((todo) => todo.isCompleted === true);
    default:
      return todos;
  }
};

export const parseHash = (hashStr) => hashStr.split('#').pop();

export const getDataAttribute = (str) => {
  return lowercaseFirstLetter(str.slice('data'.length));
};

const lowercaseFirstLetter = (str) => {
  return str.charAt(0).toLowerCase() + str.slice(1);
};
