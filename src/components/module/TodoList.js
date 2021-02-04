/*@jsx Reilly.createElement*/
import Reilly from 'reilly';
import { TodoItemContainer } from 'components';

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
      <ul id="todo-list" className="todo-list">
        {todoList?.map(todo => (
          <TodoItemContainer
            todo={todo}
            editingId={editingId}
            onDelete={onDelete}
            onStartEdit={onStartEdit}
            onToggle={onToggle}
            onConfirmEdit={onConfirmEdit}
            onSetPriority={onSetPriority}
          />
        ))}
      </ul>
    );
  }
}

export default TodoList;
