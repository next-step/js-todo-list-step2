import TodoCount from './TodoCount.js';
import TodoFilter from './TodoFilter.js';
import { createDOM } from '../../utils.js';
import { deleteUserTodoItemsAllHandler } from '../../eventHandler.js';
const TodoCountContainer = ({ getFilter, setFilter }) => {
  const dom = createDOM(
    'div',
    {
      className: 'count-container',
    });

  const clearCompleted = createDOM(
    'button',
    {
      className: 'clear-completed',
      innerText: '모두 삭제',
    }
  );

  clearCompleted.addEventListener('click', deleteUserTodoItemsAllHandler);

  dom.append(
    TodoCount({ getFilter }),
    TodoFilter({ getFilter, setFilter }),
    clearCompleted,
  );

  return dom;
};

export default TodoCountContainer;