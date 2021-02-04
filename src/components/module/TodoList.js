/*@jsx Reilly.createElement*/
import Reilly from 'reilly';
import { TodoItem } from 'components';

class TodoList extends Reilly.Component {
  render() {
    const {
      todoList,
      editingId,
      onToggle,
      onDelete,
      onSetPriority,
      onStartEdit,
      onConfirmEdit,
    } = this.props;

    return (
      <ul
        id="todo-list"
        className="todo-list"
        onchange={onToggle}
        onclick={onDelete}
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
