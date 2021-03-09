/*@jsx Reilly.createElement*/
import Reilly from 'reilly';
import { TodoFooter, TodoList, TodoForm } from 'components';
import { Interactions, FILTER_STATUS, keyCode } from 'utils';
import { store } from '..';
import { PRIORITY_ENUM } from 'utils';
import {
  addTodoAsync,
  toggleTodoAsync,
  deleteTodoAsync,
  deleteAllTodoAsync,
  setPriorityTodoAsync,
  startEdit,
  cancelEdit,
  confirmEdit,
  fetchTodosAsync,
} from '../reducs/module/todo';
import { useSelector } from '../lib/reducs';

function Main(props) {
  const onAddTodo = (() => {
    let isSubmitting = false;

    return async function onAddTodo(e) {
      e.preventDefault();
      if (isSubmitting) return;
      isSubmitting = true;

      const content = e.target.elements['new-todo'].value.trim();

      if (!content) {
        isSubmitting = false;
        return;
      }

      if (content.length < 2) {
        Interactions.warnTodo(content);
        isSubmitting = false;
        return;
      }

      store.dispatch(addTodoAsync(content));

      isSubmitting = false;
    };
  })();

  const onToggleTodo = e => {
    e.stopPropagation();
    if (!e.target.matches('.toggle')) return;

    const { id } = e.target.closest('li');
    const toggledTodoList = todoList.map(toggledBy(id));

    store.dispatch(toggleTodoAsync(id, toggledTodoList));
  };

  const onDeleteTodo = e => {
    if (!e.target.matches('.destroy')) return;
    if (!Interactions.confirmDelete()) return;

    const { id } = e.target.closest('li');
    const deletedTodoList = todoList.filter(todo => todo._id !== id);

    store.dispatch(deleteTodoAsync(id, deletedTodoList));
  };

  const onDeleteAllTodos = async () => {
    if (!todoList.length) {
      Interactions.noTodos();
      return;
    }
    const answer = Interactions.confirmDeleteAll();
    if (!answer) return;

    store.dispatch(deleteAllTodoAsync());
  };

  const onSetPriority = async e => {
    const { id } = e.target.closest('li');
    const priority = PRIORITY_ENUM.get(e.target.selectedIndex); // select node

    store.dispatch(setPriorityTodoAsync(id, priority));
  };

  const onStartEditTodo = async e => {
    if (!e.target.matches('label')) return;

    const { id: editingId } = e.target.closest('li');

    store.dispatch(startEdit(editingId));
  };

  const onConfirmEditTodo = async e => {
    if (!(keyCode.isEnter(e) || keyCode.isEscape(e))) return;

    if (keyCode.isEscape(e)) {
      store.dispatch(cancelEdit());
      return;
    }

    const { id } = e.target.closest('li');
    const contents = e.target.value;

    if (!contents) {
      store.dispatch(cancelEdit());
      return;
    }

    store.dispatch(confirmEdit(id, contents));
  };

  const { todoList, mode, editingId, error } = useSelector(state => state.todo);

  const filteredTodos = todoList?.filter(by(mode)) || [];

  if (error) return <h2>Todo Error, plz redirect</h2>;
  return (
    <main>
      <TodoForm onsubmit={onAddTodo} />
      <TodoList
        todoList={filteredTodos}
        editingId={editingId}
        onToggle={onToggleTodo}
        onDelete={onDeleteTodo}
        onSetPriority={onSetPriority}
        onStartEdit={onStartEditTodo}
        onConfirmEdit={onConfirmEditTodo}
      />
      <TodoFooter
        mode={mode}
        length={todoList?.length}
        onDeleteAll={onDeleteAllTodos}
      />
    </main>
  );
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

const toggledBy = targetId => todo => {
  const newTodo = {
    ...todo,
    isCompleted: !todo.isCompleted,
    _updatedAt: new Date().toISOString(),
  };

  return todo._id !== targetId ? todo : newTodo;
};

export default Main;
