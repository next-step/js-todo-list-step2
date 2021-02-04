/*@jsx Reilly.createElement*/
import Reilly from 'reilly';
import { TodoItem } from 'components';

class TodoItemContainer extends Reilly.Component {
  render() {
    const {
      todo,
      editingId,
      onToggle,
      onDelete,
      onSetPriority,
      onStartEdit,
      onConfirmEdit,
    } = this.props;

    return (
      <TodoItem
        todo={todo}
        editingId={editingId}
        onDelete={onDelete}
        onStartEdit={onStartEdit}
        onToggle={onToggle}
        onConfirmEdit={onConfirmEdit}
        onSetPriority={onSetPriority}
      />
    );
  }
}

export default TodoItemContainer;
