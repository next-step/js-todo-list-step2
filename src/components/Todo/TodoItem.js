import TodoLabel from './TodoLabel.js';

const TodoItem = ({ content }) => {
  return `
      <div class="view">
      <input class="toggle" type="checkbox" />
      ${ TodoLabel({ content }) }
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${ content }" />
  `;
};

export default TodoItem;