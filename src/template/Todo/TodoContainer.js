import TodoInput from './TodoInput.js';

import TodoList from './TodoList.js';
import TodoCountContainer from './TodoCountContainer.js';
import { useState } from '../../core/state.js';
import * as CONST from '../../constants/index.js';


const TodoContainer = () => {
  const [getFilter, setFilter] = useState(CONST.ALL);

  const dom = document.createElement('section');
  dom.classList.add('todoapp');

  dom.append(
    TodoInput(),
    TodoList({ getFilter }),
    TodoCountContainer({ getFilter, setFilter })
  );

  return dom ;
};

export default TodoContainer;