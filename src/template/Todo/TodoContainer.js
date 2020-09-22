import TodoInput from './TodoInput.js';

import TodoList from './TodoList.js';
import TodoCountContainer from './TodoCountContainer.js';
import { useState } from '../../core/state.js';
import * as CONST from '../../constants/index.js';


const TodoContainer = () => {
  const [getFilter, setFilter] = useState(CONST.ALL);

  const components = {
    TodoInput: TodoInput(),
    TodoList: TodoList({ getFilter }),
    TodoCountContainer: TodoCountContainer({ getFilter, setFilter }),
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