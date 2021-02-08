/*@jsx Reilly.createElement*/
import Reilly from 'reilly';
import { TodoItem } from 'components';

function TodoList(props) {
  const {
    todoList,
    editingId,
    onToggle,
    onDelete,
    onSetPriority,
    onStartEdit,
    onConfirmEdit,
  } = props;

  return (
    <ul id="todo-list" className="todo-list">
      {todoList?.map(todo => (
        <TodoItem
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

export default TodoList;
