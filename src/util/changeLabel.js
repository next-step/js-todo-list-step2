import CONSTANT from '../constants.js';
import api from './api.js';
import { showError } from './error.js';

const changeLabel = async (userId, itemId, value, getNewTodos) => {
  const priority = {
    0: CONSTANT.NONE,
    1: CONSTANT.FIRST,
    2: CONSTANT.SECOND,
  }[value];
  if (!priority) return;
  const response = await api.changeTodoLabel(userId, itemId, priority);
  if (response.isError) {
    return showError(response.data);
  }
  return getNewTodos(userId);
};

export { changeLabel };
