import TodoItem from './TodoItem.js';
import selectedUserStore, { GET_USER, ADD_TODO, DELETE_TODO } from '../modules/selectedUser.js';

const Todolist = () => {
  const $todolist = document.querySelector('ul.todo-list');
  const { render: todoItemRender } = TodoItem();

  const render = () => {
    const todos = selectedUserStore.getState().todoList;
    $todolist.innerHTML = todos.map((todo) => todoItemRender(todo)).join('\n');
  };

  const onDeleteTodo = ({ target }) => {
    if (target.classList.contains('destroy')) {
      const closestLi = target.closest('li');
      const userId = selectedUserStore.getState()._id;
      const itemId = closestLi.dataset.id;
      selectedUserStore.dispatch({ type: DELETE_TODO, payload: { userId, itemId } });
    }
  };

  $todolist.addEventListener('click', onDeleteTodo);

  selectedUserStore.subscribe(GET_USER, render);
  selectedUserStore.subscribe(ADD_TODO, render);
  selectedUserStore.subscribe(DELETE_TODO, render);
};

export default Todolist;
