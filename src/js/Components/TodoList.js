import { todoItemTemplate } from '../Config/Template.js';

import { getTodoItemId, getTodoList } from '../Helper/TodoHelper.js';

import { subscribeSelectedUser } from '../Store.js';

const TodoList = ({ onComplete, onDelete }) => {
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

  const render = (selectedUser) => {
    const list = getTodoList(selectedUser);

    if (list.length === 0) {
      return (listElement.innerHTML = '');
    }

    listElement.innerHTML = list.map((item) => todoItemTemplate(item)).join('');
  };

  listElement.addEventListener('click', completeTodo);
  listElement.addEventListener('click', deleteTodo);

  subscribeSelectedUser(render);
};

export default TodoList;
