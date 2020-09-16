import TodoLoading from './TodoLoading.js';
import TodoItem from './TodoItem.js';
import { getter } from '../../store/index.js';

const TodoList = () => {
  const { user } = getter;
  return `
    <section class="main">
    <ul class="todo-list">
      <li class="loading">${ TodoLoading({}) }</li>
      ${ user()?.todoList?.map(todo => `<li data-todoIdx="${todo._id}">  ${ TodoItem({ todo }) } </li>`).join('') }
    </ul>
    </section>
    `;
};

export default TodoList;