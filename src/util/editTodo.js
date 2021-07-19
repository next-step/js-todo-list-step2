import CONSTANT from '../constants.js';
import api from './api.js';
import { showError } from './error.js';

const editTodoText = async (
  { key, target },
  originValue,
  userId,
  getNewTodos
) => {
  if (key === CONSTANT.ESCAPE || key === CONSTANT.ESC) {
    target.value = originValue;
    target.closest('li').classList.remove('editing');
    return;
  }
  if (key === CONSTANT.ENTER) {
    if (target.value.length < 2) {
      return alert('두 글자 이상이어야합니다!');
    }
    const itemId = target.closest('li').dataset.id;
    const response = await api.editTodoItem(userId, itemId, target.value);
    if (response.isError) {
      return showError(response.data);
    }
    getNewTodos(userId);
  }
};

const editTodo = (userId, target, getNewTodos) => {
  const name = target.className;
  const callback = { label: editTodoText }[name];
  if (!callback) return;
  const originValue = target.innerText;
  const $li = target.closest('li');
  $li.classList.add('editing');
  $li.addEventListener('keyup', (event) => {
    editTodoText(event, originValue, userId, getNewTodos);
  });
};

export { editTodo };
