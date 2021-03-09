/*@jsx Reilly.createElement*/
import Reilly from 'reilly';

function TodoCount({ length }) {
  return (
    <span className="todo-count">
      총 <strong>{length || '0'}</strong> 개
    </span>
  );
}

export default TodoCount;
