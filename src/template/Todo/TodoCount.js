import { getter } from '../../store/index.js';
import * as CONST from '../../constants/index.js';
import { observer } from '../../store/index.js';

const TodoCount = (props) => {
  const dom = document.createElement('span');
  dom.classList.add('todo-count');
  const { getFilter } = props;

  const render = () => {
    const todoList = getter.userItems();
    const filter = getFilter();
    const filterLength = () => {
      return filter === CONST.ALL ? todoList : todoList.filter(todo => (filter === 'active') === !todo.isCompleted );
    };
    dom.innerHTML = `총 <strong>${ filterLength(filter).length }</strong> 개`;
  };

  getFilter(render);
  observer.addObserver('userItems', render);
  observer.addObserver('user', render);

  return { dom, render };
};

export default TodoCount;