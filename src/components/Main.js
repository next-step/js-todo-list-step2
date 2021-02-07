/*@jsx Reilly.createElement*/
import Reilly from 'reilly';
import { TodoFooter, TodoList, TodoForm } from 'components';
import { FILTER_STATUS } from 'utils';

class Main extends Reilly.Component {
  render() {
    const {
      todoList,
      mode,
      editingId,
      onStartEdit,
      onConfirmEdit,
      onAdd,
      onToggle,
      onDelete,
      onDeleteAll,
      onSetPriority,
      onModeChange,
    } = this.props;

    const filteredTodos = todoList?.filter(by(mode)) || [];

    return (
      <main>
        <TodoForm onsubmit={onAdd} />
        <TodoList
          todoList={filteredTodos}
          editingId={editingId}
          onAdd={onAdd}
          onToggle={onToggle}
          onDelete={onDelete}
          onSetPriority={onSetPriority}
          onStartEdit={onStartEdit}
          onConfirmEdit={onConfirmEdit}
        />
        <TodoFooter
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
