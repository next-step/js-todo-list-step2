/* @jsx createElement */
import useLocalStorage from '../hooks/useLocalStorage.js';
import { store } from '../index.js';
import { createElement } from '../lib/React.js';
import { useSelector } from '../lib/Redux.js';
import { addTodo } from '../modules/todos/index.js';
import { getUser } from '../modules/user/index.js';

const TodoInput = () => {
  const { user } = useSelector((state) => state.user);

  const handleChange = (e) => {
    if (e.target.value.length < 2)
      return alert('최소 2글자 이상 입력해주세요!');
    store.dispatch(addTodo(user._id, e.target.value));
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
