import { API } from '../../api/api.js';
import { MIMUN_TODO_LENGTH } from '../../constant/todo.js';
import { getCurrentUser } from '../../utils/localStorage.js';
import { loadTodos } from './loadTodos.js';

const editTodoItem = async (target) => {
  const newTitle = target.value;

  if (newTitle.length < MIMUN_TODO_LENGTH) {
    alert('빈 문자열은 입력할 수 없습니다!');
  }

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
