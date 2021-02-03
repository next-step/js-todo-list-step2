/*@jsx Reilly.createElement*/
import Reilly from '../../lib/reilly/Reilly';
import TodoItem from './TodoItem';

class TodoList extends Reilly.Component {
  render() {
    const {
      todoList,
      editingId,
      onToggle,
      onRemove,
      onSetPriority,
      onStartEdit,
      onConfirmEdit,
    } = this.props;

    return (
      <ul
        id="todo-list"
        className="todo-list"
        onchange={onToggle}
        onclick={onRemove}
        ondblclick={onStartEdit}
        onkeyup={onConfirmEdit}
      >
        {todoList?.map(todo => (
          <TodoItem
            todo={todo}
            editingId={editingId}
            onSetPriority={onSetPriority}
          />
        ))}
      </ul>
    );
  }
}

export default TodoList;
