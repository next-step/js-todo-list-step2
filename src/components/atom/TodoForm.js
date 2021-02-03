/*@jsx Reilly.createElement*/
import Reilly from '../../lib/reilly/Reilly';

function TodoForm(props) {
  const { onsubmit } = props;

  return (
    <form onsubmit={onsubmit}>
      <input
        id="new-todo-title"
        name="new-todo"
        className="new-todo"
        placeholder="할일을 추가하세요"
      />
    </form>
  );
}

export default TodoForm;
