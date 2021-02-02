/*@jsx Reilly.createElement*/
import Reilly from '../lib/reilly/Reilly.js';
import CountContainer from './module/CountContainer.js';
import TodoList from './module/TodoList.js';
import { FILTER_STATUS } from '../types/constants.js';

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

    return (
      <main>
        <TodoList
          todoList={filteredTodos}
          editingId={editingId}
          onToggle={onToggle}
          onRemove={onRemove}
          onSetPriority={onSetPriority}
          onStartEdit={onStartEdit}
          onConfirmEdit={onConfirmEdit}
        />
        <CountContainer
          mode={mode}
          length={todoList.length}
          onModeChange={onModeChange}
          onDeleteAll={onDeleteAll}
        />
      </main>
    );
  }
}

const by = mode => todo => {
  switch (mode) {
    case FILTER_STATUS.ALL:
      return todo;
    case FILTER_STATUS.ACTIVE:
      return !todo.isCompleted;
    case FILTER_STATUS.COMPLETED:
      return todo.isCompleted;
  }
};

export default Main;
