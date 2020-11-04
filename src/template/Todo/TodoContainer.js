import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';
import TodoCountContainer from './TodoCountContainer.js';
import { useState } from '../../core/state.js';
import * as CONST from '../../constants/filter.js';
import { createDOM } from '../../utils.js';

const TodoContainer = () => {
  const [getFilter, setFilter] = useState(CONST.ALL);

  const dom = createDOM('section', { className: 'todoapp' });

  dom.append(
    TodoInput(),
    TodoList({ getFilter }),
    TodoCountContainer({ getFilter, setFilter }),
  );

  return dom;
};

export default TodoContainer;