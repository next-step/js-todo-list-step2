/* @jsx createElement */
import { store } from '../index.js';
import { createElement } from '../lib/React.js';
import { useSelector } from '../lib/Redux.js';
import { CHANGE_TYPE, deleteAllTodo } from '../modules/todos/index.js';

const TodoCount = () => {
  const {
    user: { user },
    todo: { type, todos },
  } = useSelector();

  const handleClick = (type) => {
    store.dispatch({ type: CHANGE_TYPE, payload: type });
  };

  const deleteAllClick = () => {
    store.dispatch(deleteAllTodo(user._id));
  };

  const count = todos.filter((todo) => {
    if (type === 'all') return true;
    if (type === 'todo') return !todo.isCompleted;
    if (type === 'completed') return todo.isCompleted;
  }).length;

  return (
    <div className="count-container">
      <span className="todo-count">
        총 <strong>{count}</strong> 개
      </span>
      <ul className="filters">
        <li onclick={() => handleClick('all')}>
          <a className={type === 'all' ? 'all selected' : 'all'} href="#">
            전체보기
          </a>
        </li>
        <li onclick={() => handleClick('todo')}>
          <a
            className={type === 'todo' ? 'active selected' : 'active'}
            href="#active"
          >
            해야할 일
          </a>
        </li>
        <li onclick={() => handleClick('completed')}>
          <a
            className={
              type === 'completed' ? 'completed selected' : 'completed'
            }
            href="#completed"
          >
            완료한 일
          </a>
        </li>
      </ul>
      <button className="clear-completed" onclick={deleteAllClick}>
        모두 삭제
      </button>
    </div>
  );
};

export default TodoCount;
