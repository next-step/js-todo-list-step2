import TodoCount from './TodoCount.js';
import TodoFilter from './TodoFilter.js';

const TodoCountContainer = ({}) => {
  return `
    <div class="count-container">
      ${ TodoCount({}) }
      ${ TodoFilter({}) }
      <button class="clear-completed">모두 삭제</button>
    </div>
  `
};

export default TodoCountContainer;