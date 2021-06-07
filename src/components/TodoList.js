/* @jsx createElement */
import { createElement } from '../lib/React';
import { useSelector } from '../lib/Redux';
import TodoListItem from './TodoListItem';

const TodoList = () => {
  const {
    todo: { type, todos },
  } = useSelector();
  return (
    <ul id="todo-list" className="todo-list">
      {todos
        .filter((todo) => {
          if (type === 'all') return true;
          if (type === 'todo') return !todo.isCompleted;
          if (type === 'completed') return todo.isCompleted;
        })
        .map((todo) => (
          <TodoListItem key={todo.id} todo={todo} />
        ))}
    </ul>
  );
};

export default TodoList;
