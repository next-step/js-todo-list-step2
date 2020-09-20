import TodoLoading from './TodoLoading.js';
import TodoItem from './TodoItem.js';
import { getter, setter } from '../../store/index.js';
import { observer } from '../../store/index.js';
import { putUserItemCompleteToggleService, deleteUserItemService, putUserItemService } from '../../endpoint/service.js';

const TodoList = () => {
  const components = {
    TodoLoading: TodoLoading(),
    todoList: {},
  };
  let editItem = { id: -1, components: undefined };

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

  const setEditMode = ({ target }) => {
    if (target.dataset.component === 'todo-label') {
      const itemId = target.closest('li').dataset.todoIdx;
      const component = components.todoList[itemId];
      if (editItem.id !== -1 && editItem.id !== itemId) {
        setter.itemMode(editItem.id, 'view');
        editItem.component.render();
      }
      editItem = { id: itemId, component };
      setter.itemMode(itemId, 'edit');
      component.render();
    }
  };

  const editItemContents = async ({ target, target: { closest, dataset, value }, key }) => {
    if (dataset.component === 'editMode' && value !== '' && key === 'Enter') {
      const itemId = target.closest('li').dataset.todoIdx;
      const userId = getter.userId();
      const contents = value;

      try {
        await putUserItemService({ userId, itemId, contents });
        await setter.userItems(userId);
      } catch (err) {
        alert(err.message);
        if (err.message === 'item not found')
          await setter.userItems(userId);
        if (err.message === 'user not found')
          await setter.user();
      }
    }
  };

  const setViewItemWithEsc = async ({ key, target: { dataset }}) => {
    if (dataset.component === 'editMode' && key === 'Escape') {
      setter.itemMode(editItem.id, 'view');
      editItem.component.render();
      editItem.id = -1;
      editItem.component = undefined;
    }
  };

  const todos = document.createElement('div');
  todos.addEventListener('click', async ({ target }) => {
    if (target.dataset.component === 'toggleComplete')
      await toggleComplete(target);

    if (target.dataset.component === 'deleteItem')
      await deleteItem(target);
  });
  todos.addEventListener('dblclick', setEditMode);
  todos.addEventListener('keypress', editItemContents);
  todos.addEventListener('keydown', setViewItemWithEsc);

  ul.appendChild(todos);

  components.TodoLoading.render();

  const render = () => {
    const { userItems } = getter;
    todos.innerHTML = '';
    userItems()?.forEach(todo => {
      const todoItem = TodoItem({ todo });
      components.todoList[todo._id] = todoItem;
      todos.appendChild(todoItem.dom);
      todoItem.render();
    });
  };

  observer.addObserver('user', render);
  observer.addObserver('userItems', render);

  return { dom, render };
};

export default TodoList;