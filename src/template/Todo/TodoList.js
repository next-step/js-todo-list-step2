import TodoLoading from './TodoLoading.js';
import TodoItem from './TodoItem.js';

const TodoList = ({}) => {
  return `
    <section class="main">
    <ul class="todo-list">
      <li>${ TodoLoading({}) }</li>
      <li> ${ TodoItem({}) } </li>
    </ul>
    </section>
    `
};

export default TodoList;