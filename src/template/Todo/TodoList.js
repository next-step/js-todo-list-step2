import TodoLoading from './TodoLoading.js';
import TodoItem from './TodoItem.js';
import { getter, setter } from '../../store/index.js';
import { observer } from '../../store/index.js';
import { putUserItemCompleteToggleService, deleteUserItemService } from '../../endpoint/service.js';

const TodoList = () => {
  const components = {
    TodoLoading: TodoLoading(),
  };

  const dom = document.createElement('section');
  dom.classList.add('main');

  const ul = document.createElement('ul');
  ul.classList.add('todo-list');
  ul.appendChild(components.TodoLoading.dom);
  dom.appendChild(ul);

  const toggleComplete = async (target) => {
    const itemId = target.closest('li').dataset.todoIdx;
    const userId = getter.userId();
    try {
      await putUserItemCompleteToggleService({ userId, itemId });
    } catch (err) {
      alert(err.message);
      await setter.userList();
      await setter.user();
    }
  };

  const deleteItem = async (target) => {
    const userId = getter.userId();
    const itemId = target.closest('li').dataset.todoIdx;
    try {
      await deleteUserItemService({ userId, itemId });
      await setter.userItems(userId);
    } catch (err) {
      alert(err.message);
      if (err.message === 'item not found')
        await setter.userItems(userId);
      if (err.message === 'user not found')
        await setter.user();
    }
  };

  const todos = document.createElement('div');
  todos.addEventListener('click', async ({ target }) => {
    if (target.dataset.component === 'toggleComplete')
      await toggleComplete(target);

    if (target.dataset.component === 'deleteItem')
      await deleteItem(target);
  });

  ul.appendChild(todos);

  components.TodoLoading.render();

  const render = () => {
    const { userItems } = getter;
    todos.innerHTML = '';
    userItems()?.forEach(todo => {
      const todoItem = TodoItem({ todo });
      todos.appendChild(todoItem.dom);
      todoItem.render();
    });
  };

  observer.addObserver('user', render);
  observer.addObserver('userItems', render);

  return { dom, render };
};

export default TodoList;