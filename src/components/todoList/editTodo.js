import { API } from '../../api/api.js';
import { getCurrentUser } from '../../utils/localStorage.js';
import { loadTodos } from './loadTodos.js';

const editTodoItem = async (target) => {
  const newTitle = target.value;
  const currentUser = getCurrentUser();
  const currentTarget = target.closest('li').id;

  await API.editTodo(newTitle, currentUser, currentTarget);
  loadTodos(currentUser);
};

const revertTodoItem = (target, originalValue) => {
  target.value = originalValue;
  target.closest('li').classList.remove('editing');
};

export const editTodo = ({ target, key }, originalValue) => {
  const keyList = {
    Enter: editTodoItem,
    Escape: revertTodoItem,
  };
  return keyList[key] && keyList[key](target, originalValue);
};
