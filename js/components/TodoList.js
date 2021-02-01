import Reilly, { createElement } from '../lib/reilly/Reilly.js';
import { Skeleton } from './Skeleton.js';
import TodoItem from './TodoItem.js';

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

    return createElement(
      'ul',
      {
        id: 'todo-list',
        className: 'todo-list',
        onchange: onToggle,
        onclick: onRemove,
        ondblclick: onStartEdit,
        onkeyup: onConfirmEdit,
      },
      ...todoList?.map(todo =>
        createElement(TodoItem, { todo, editingId, onSetPriority })
      )
    );
  }
}

export default TodoList;
