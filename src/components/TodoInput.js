/* @jsx createElement */
import useLocalStorage from '../hooks/useLocalStorage.js';
import { store } from '../index.js';
import { createElement } from '../lib/React.js';
import { useSelector } from '../lib/Redux.js';
import { ADD_TODO } from '../modules/todos/index.js';

const TodoInput = () => {
  const todos = useSelector((state) => state.todos);
  const [_, setData] = useLocalStorage('todos');
  setData(todos);

  const handleChange = (e) => {
    store.dispatch({ type: ADD_TODO, payload: e.target.value });
    document.getElementById('new-todo-title').focus();
  };

  return (
    <div>
      <input
        id="new-todo-title"
        className="new-todo"
        placeholder="할일을 추가해주세요"
        autofocus
        onchange={handleChange}
      />
    </div>
  );
};

export default TodoInput;
