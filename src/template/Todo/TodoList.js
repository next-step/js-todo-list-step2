import TodoLoading from './TodoLoading.js';
import TodoItem from './TodoItem.js';
import { getter, setter, initStore, observer } from '../../store/index.js';
import {
  updateUserTodoItemComplete,
  removeUserTodoItem,
  updateUserTodoItem,
  updateUserTodoItemPriority,
} from '../../endpoint/service.js';
import { ERROR } from '../../constants/messageAPI.js';

const TodoList = (props) => {
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
      await updateUserTodoItemComplete({ userId, itemId });
      await setter.userItems(userId);
      render();
    }
    catch (err) {
      alert(err.message);
      if (err.message === ERROR.NO_USER3) {
        await initStore();
      }
      if (err.message === ERROR.NO_TODO_ITEM) {
        await setter.userItems(userId);
      }
    }
  };

  const deleteItem = async (target) => {
    const userId = getter.userId();
    const itemId = target.closest('li').dataset.todoIdx;
    try {
      await removeUserTodoItem({ userId, itemId });
      await setter.userItems(userId);
    }
    catch (err) {
      alert(err.message);
      if (err.message === ERROR.DELETE_TODO_ITEM) {
        await setter.userItems(userId);
      }
      if (err.message === ERROR.NO_USER3) {
        await initStore();
      }
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
        await updateUserTodoItem({ userId, itemId, contents });
        await setter.userItems(userId);
      }
      catch (err) {
        alert(err.message);
        if (err.message === ERROR.UPDATE_TODO_ITEM) {
          await setter.userItems(userId);
        }
        if (err.message === ERROR.NO_USER3) {
          await initStore();
        }
      }
    }
  };

  const setViewItemWithEsc = async ({ key, target: { dataset } }) => {
    if (dataset.component === 'editMode' && key === 'Escape') {
      setter.itemMode(editItem.id, 'view');
      editItem.component.render();
      editItem.id = -1;
      editItem.component = undefined;
    }
  };

  const setPriority = async ({ target, target: { dataset, value } }) => {
    if (dataset.component === 'todoPriority') {
      const itemId = target.closest('li').dataset.todoIdx;
      const userId = getter.userId();
      const priority = value;
      try {
        const result = await updateUserTodoItemPriority({ userId, itemId, priority });
        setter.userItem(itemId, result);
        components.todoList[itemId].components.todoLabel.render();
        render();
      }
      catch (err) {
        alert(err.message);
        if (err.message === ERROR.UPDATE_TODO_ITEM) {
          await setter.userItems(userId);
        }
        if (err.message === ERROR.NO_USER3) {
          await initStore();
        }

      }
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
  todos.addEventListener('change', setPriority);

  ul.appendChild(todos);

  components.TodoLoading.render();

  const render = () => {
    const { userItems } = getter;
    const { getFilter } = props;
    todos.innerHTML = '';

    userItems()?.forEach(todo => {
      const todoItem = TodoItem({ getFilter, todo });
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