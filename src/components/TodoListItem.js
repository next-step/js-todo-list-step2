/* @jsx createElement */
import {
  deleteTodo,
  setPriorityTodo,
  toggleTodo,
  updateTodo,
} from '../modules/todos';
import { store } from '../index.js';
import { createElement } from '../lib/React.js';
import { CHANGE_MODE } from '../modules/todos/index.js';
import { useSelector } from '../lib/Redux';
import Skeleton from './Skeleton';
import { getUser } from '../modules/user';

const TodoListItem = ({ todo }) => {
  const { user, loading } = useSelector((state) => state.user);

  const toggleClick = () => {
    store.dispatch(toggleTodo(user._id, todo._id));
  };

  const deleteClick = () => {
    store.dispatch(deleteTodo(user._id, todo._id));
  };

  const changeModeClick = () => {
    store.dispatch({ type: CHANGE_MODE, payload: todo._id });
  };

  const makeTodoClassName = () => {
    if (todo.isCompleted) {
      return todo.editMode ? 'completed editing' : 'completed';
    }
    return todo.editMode ? 'editing' : '';
  };

  const editChange = (e) => {
    if (e.key === 'Enter') {
      store.dispatch(updateTodo(user._id, todo._id, e.target.value));
      store.dispatch({ type: CHANGE_MODE, payload: todo._id });
    }
    if (e.key === 'Escape') {
      store.dispatch({ type: CHANGE_MODE, payload: todo._id });
    }
  };

  const changePriority = (e) => {
    store.dispatch(setPriorityTodo(user._id, todo._id, e.target.value));
  };

  return (
    <li className={makeTodoClassName()} ondblclick={changeModeClick}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onclick={toggleClick}
          checked={todo.isCompleted}
        />
        <label className="label">
          {loading ? (
            <Skeleton />
          ) : (
            <fragment>
              <select className="chip select" onchange={changePriority}>
                <option value="NONE" selected>
                  순위
                </option>
                <option value="FIRST">1순위</option>
                <option value="SECOND">2순위</option>
              </select>
              {todo.contents}
              <span
                className={`priority ${todo.priority} ${
                  todo.isCompleted ? 'completed' : ''
                }`}
              >
                {todo.priority === 'FIRST' ? 1 : 2}
                순위
              </span>
            </fragment>
          )}
        </label>
        <button className="destroy" onclick={deleteClick}></button>
      </div>
      <input className="edit" value={todo.contents} onkeyup={editChange} />
    </li>
  );
};

export default TodoListItem;
