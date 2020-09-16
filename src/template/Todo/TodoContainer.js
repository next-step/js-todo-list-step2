import TodoInput from './TodoInput.js';

import TodoList from './TodoList.js';
import TodoCountContainer from './TodoCountContainer.js';

const TodoContainer = ({}) => {
  return `
    <section class="todoapp">
      ${ TodoInput({}) }
      ${ TodoList({}) }
      ${ TodoCountContainer({}) }
    </section>
  `;
};

export default TodoContainer;