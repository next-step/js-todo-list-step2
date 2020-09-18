import TodoInput from './TodoInput.js';

import TodoList from './TodoList.js';
import TodoCountContainer from './TodoCountContainer.js';


const TodoContainer = () => {
  const components = {
    TodoInput: TodoInput(),
    TodoList: TodoList(),
    TodoCountContainer: TodoCountContainer(),
  };

  const dom = document.createElement('section');
  dom.classList.add('todoapp');

  dom.appendChild(components.TodoInput.dom);
  dom.appendChild(components.TodoList.dom);
  dom.appendChild(components.TodoCountContainer.dom);

  components.TodoInput.render();
  components.TodoList.render();

  return { dom };
};

export default TodoContainer;