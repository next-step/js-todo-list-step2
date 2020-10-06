import TodoLoading from './TodoLoading.js';
import TodoItem from './TodoItem.js';
import { getter, observer } from '../../store/index.js';
import { createDOM } from '../../utils.js';
import {
  toggleCompleteHandler,
  deleteTodoItemHandler,
  editItemContentsHandler,
  editModeHandler,
  escapeEditHandler,
  setPriorityHandler,
} from '../../eventHandler.js';

const TodoList = ({ getFilter }) => {
  const components = {
    todoList: {},
  };
  let editItem = { id: -1, components: undefined };

  const dom = createDOM(
    'section',
    {
      className: 'name',
    },
  );

  const ul = createDOM(
    'ul',
    {
      className: 'todo-list',
    },
  );
  ul.append(
    TodoLoading(),
  );
  dom.append(ul);

  const todos = document.createElement('div');

  todos.addEventListener('click', async({ target }) => {
    if (target.dataset.component === 'toggleComplete')
      await toggleCompleteHandler(target);

    if (target.dataset.component === 'deleteItem')
      await deleteTodoItemHandler(target);
  });

  todos.addEventListener('dblclick', (event) => {
    const itemId = editModeHandler(event, editItem);
    if (itemId) {
      const component = components.todoList[itemId];
      component.render();
      editItem = { id: itemId, component };
    }
  });

  todos.addEventListener('keypress', editItemContentsHandler);
  todos.addEventListener('keydown', async(event) => (
    await escapeEditHandler(event, editItem)),
  );
  todos.addEventListener('change', async(event) => {
    await setPriorityHandler(event)
  });

  ul.appendChild(todos);

  const render = () => {
    const { userItems } = getter;
    todos.innerHTML = '';

    userItems()?.forEach(todo => {
      const todoItem = TodoItem({ getFilter, todo });
      components.todoList[todo._id] = todoItem;
      todos.appendChild(todoItem.dom);
    });
  };

  observer.addObserver('user', render);
  observer.addObserver('userItems', render);

  render();
  return dom;
};

export default TodoList;