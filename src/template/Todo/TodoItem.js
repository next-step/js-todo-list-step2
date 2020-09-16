import TodoLabel from './TodoLabel.js';

const TodoItem = ({ todo }) => {
  return `
      <div class="view">
      <input class="toggle" type="checkbox" />
      ${ TodoLabel({ contents: todo.contents }) }
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${ todo.contents }" />
  `;
};

export default TodoItem;