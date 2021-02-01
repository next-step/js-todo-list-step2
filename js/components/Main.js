import Reilly, { createElement } from '../lib/reilly/Reilly.js';
import CountContainer from './CountContainer.js';
import TodoList from './TodoList.js';
import { FILTER_STATUS } from '../types/constants.js';
import { Skeleton } from './Skeleton.js';

class Main extends Reilly.Component {
  render() {
    const {
      todoList,
      mode,
      editingId,
      onStartEdit,
      onConfirmEdit,
      onToggle,
      onRemove,
      onDeleteAll,
      onSetPriority,
      onModeChange,
    } = this.props;

    const filteredTodos = todoList?.filter(by(mode)) || [];

    return createElement(
      'main',
      null,
      createElement(TodoList, {
        todoList: filteredTodos,
        editingId,
        onToggle,
        onRemove,
        onSetPriority,
        onStartEdit,
        onConfirmEdit,
      }),
      createElement(CountContainer, {
        mode,
        todoList,
        onModeChange,
        onDeleteAll,
      })
    );
  }
}

const by = mode => todo => {
  switch (mode) {
    case FILTER_STATUS.ALL:
      return todo;
    case FILTER_STATUS.ACTIVE:
      return todo.isCompleted;
    case FILTER_STATUS.COMPLETED:
      return !todo.isCompleted;
  }
};

export default Main;
