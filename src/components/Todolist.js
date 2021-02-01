import TodoItem from './TodoItem.js';
import selectedUserStore, { GET_USER } from '../modules/selectedUser.js';

const Todolist = () => {
  const $todolist = document.querySelector('ul.todo-list');
  const { render: todoItemRender } = TodoItem();

  const render = () => {
    const todos = selectedUserStore.getState().todoList;
    $todolist.innerHTML = todos.map((todo) => todoItemRender(todo)).join('\n');
  };

  selectedUserStore.subscribe(GET_USER, render);
};

export default Todolist;
