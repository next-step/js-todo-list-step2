import { todoItemTemplate } from '../Config/Template.js';

import { getTodoList } from '../Helper/TodoHelper.js';

import { subscribeSelectedUser } from '../Store.js';

const TodoList = () => {
  const listElement = document.getElementById('todo-list');

  const render = (selectedUser) => {
    const list = getTodoList(selectedUser);

    if (list.length === 0) {
      return (listElement.innerHTML = '');
    }

    listElement.innerHTML = list.map((item) => todoItemTemplate(item)).join('');
  };

  subscribeSelectedUser(render);
};

export default TodoList;
