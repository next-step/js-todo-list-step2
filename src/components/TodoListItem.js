/* @jsx createElement */
import useLocalStorage from '../hooks/useLocalStorage.js';
import { store } from '../index.js';
import { createElement } from '../lib/React.js';
import {
  CHANGE_MODE,
  REMOVE_TODO,
  TOGGLE_TODO,
  UPDATE_TODO,
} from '../modules/todos/index.js';

const TodoListItem = ({ todo }) => {
  const checked = todo.isCompleted;
  console.log(todo);

  const toggleClick = () => {
    store.dispatch({ type: TOGGLE_TODO, payload: todo.id });
  };

  const deleteClick = () => {
    store.dispatch({ type: REMOVE_TODO, payload: todo.id });
  };

  const changeModeClick = () => {
    store.dispatch({ type: CHANGE_MODE, payload: todo._id });
  };

  const makeClassName = () => {
    if (todo.isCompleted) {
      return todo.editMode ? 'completed editing' : 'completed';
    }
    return todo.editMode ? 'editing' : '';
  };

  const editChange = (e) => {
    if (e.key === 'Enter') {
      store.dispatch({
        type: UPDATE_TODO,
        payload: { id: todo.id, contents: e.target.value },
      });
      store.dispatch({ type: CHANGE_MODE, payload: todo.id });
    }
    if (e.key === 'Escape') {
      store.dispatch({ type: CHANGE_MODE, payload: todo.id });
    }
  };

  return (
    <li className={makeClassName()} ondblclick={changeModeClick}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onclick={toggleClick}
          checked={checked}
        />
        <label className="label">{todo.contents}</label>
        <button className="destroy" onclick={deleteClick}></button>
      </div>
      <input className="edit" value={todo.contents} onkeyup={editChange} />
    </li>
  );
};

export default TodoListItem;
