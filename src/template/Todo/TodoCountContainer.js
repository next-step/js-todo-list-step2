import TodoCount from './TodoCount.js';
import TodoFilter from './TodoFilter.js';

const TodoCountContainer = () => {
  const dom = document.createElement('div');
  dom.classList.add('count-container');

  const components = {
    TodoCount: TodoCount(),
    TodoFilter: TodoFilter()
  };
  const clearCompleted = document.createElement('button');
  clearCompleted.classList.add('clear-completed');
  clearCompleted.innerText = '모두 삭제';

  dom.appendChild(components.TodoCount.dom);
  dom.appendChild(components.TodoFilter.dom);
  dom.appendChild(clearCompleted);

  components.TodoCount.render();
  components.TodoFilter.render();

  return { dom };
};

export default TodoCountContainer;