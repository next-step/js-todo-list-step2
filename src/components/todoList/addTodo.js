import { API } from '../../api/api.js';
import { MIMUN_TODO_LENGTH } from '../../constant/todo.js';
import { getCurrentUser } from '../../utils/localStorage.js';
import { loadTodos } from './loadTodos.js';

export const addTodo = async ({ target, key }) => {
  if (key !== 'Enter') {
    return;
  }
  if (target.value.trim().length < MIMUN_TODO_LENGTH) {
    return alert(`${MIMUN_TODO_LENGTH}글자 이상 입력해야 합니다!`);
  }

  const currentUser = getCurrentUser();
  await API.addTodo(target.value.trim(), currentUser);
  await loadTodos(currentUser);
  target.value = '';
};
