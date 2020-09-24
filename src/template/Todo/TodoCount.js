import { getter } from '../../store/index.js';
import * as CONST from '../../constants/index.js';
import { observer } from '../../store/index.js';
import { createDOM } from '../../utils.js';

const TodoCount = ({ getFilter }) => {
  const dom = createDOM(
    'span',
    {
      className: 'todo-count'
    },
  );

  const todoItemLength = (filter, todoList) => (
    (filter === CONST.ALL ?
      todoList :
      todoList.filter((todo) => (
        (filter === CONST.ACTIVE) === !todo.isCompleted)
      ))?.length || 0
  );

  const render = () => {
    const todoList = getter.userItems();
    const filter = getFilter();
    const filterLength = todoItemLength(filter, todoList);
    dom.innerHTML = `총 <strong>${filterLength}</strong> 개`;
  };

  getFilter(render);
  observer.addObserver('userItems', render);
  observer.addObserver('user', render);

  render();
  return dom;
};

export default TodoCount;