import { todoItemTemplate } from '../Config/Template.js';

import { getTodoItemId, getTodoList } from '../Helper/TodoHelper.js';

import { subscribeSelectedUser } from '../Store.js';

const TodoList = ({ onComplete }) => {
  const listElement = document.getElementById('todo-list');

  const completeTodo = (e) => {
    const itemId = getTodoItemId(e.target.closest('li').dataset);
    if (!e.target.classList.contains('toggle')) {
      return;
    }

    onComplete(itemId);
  };

  const render = (selectedUser) => {
    const list = getTodoList(selectedUser);

    if (list.length === 0) {
      return (listElement.innerHTML = '');
    }

    listElement.innerHTML = list.map((item) => todoItemTemplate(item)).join('');
  };

  listElement.addEventListener('click', completeTodo);

  subscribeSelectedUser(render);
};

export default TodoList;
