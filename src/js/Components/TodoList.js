import { todoItemTemplate } from '../Config/Template.js';

import { getTodoItemId, getTodoList } from '../Helper/TodoHelper.js';

import { subscribeSelectedUser } from '../Store.js';

const TodoList = ({ onComplete, onDelete, onEdit }) => {
  const listElement = document.getElementById('todo-list');

  const completeTodo = (e) => {
    if (!e.target.classList.contains('toggle')) {
      return;
    }

    const itemId = getTodoItemId(e.target.closest('li').dataset);
    onComplete(itemId);
  };

  const deleteTodo = (e) => {
    if (!e.target.classList.contains('destroy')) {
      return;
    }

    const itemId = getTodoItemId(e.target.closest('li').dataset);
    onDelete(itemId);
  };

  const startEditMode = (e) => {
    const item = e.target.closest('li');
    if (e.target.classList.contains('label')) {
      item.classList.add('editing');
    }
  };

  const editModeKeydownEvent = (e) => {
    const item = e.target.closest('li');
    if (!item.classList.contains('editing')) {
      return;
    }

    if (e.key === 'Esc' || e.key === 'Escape') {
      item.classList.remove('editing');
      return;
    }

    if (e.key === 'Enter') {
      const itemId = getTodoItemId(item.dataset);
      onEdit(itemId, e.target.value);
      item.classList.remove('editing');
    }
  };

  const render = (selectedUser) => {
    const list = getTodoList(selectedUser);

    if (list.length === 0) {
      return (listElement.innerHTML = '');
    }

    listElement.innerHTML = list.map((item) => todoItemTemplate(item)).join('');
  };

  listElement.addEventListener('click', completeTodo);
  listElement.addEventListener('click', deleteTodo);
  listElement.addEventListener('dblclick', startEditMode);
  listElement.addEventListener('keydown', editModeKeydownEvent);

  subscribeSelectedUser(render);
};

export default TodoList;
