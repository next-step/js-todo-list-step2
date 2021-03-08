import { generateKey } from './util.js';

const $todoApp = document.querySelector('section.todoapp');
const $listContainer = $todoApp.querySelector('section.main');
const $listUl = $listContainer.querySelector('.todo-list');

const todoApp = (todoInput, todoList, todoStatus) => {
  let _todoItems = new Map();
  let _currentFilter = 'all';

  const _filterStatusPredicate = {
    //TODO sync with todoStatus.js/filters
    all: () => true,
    completed: ({ status }) => status === 'completed',
    active: ({ status }) => status === '',
  };

  const _createTodoItem = (content, status = '', priority = 'select') => {
    const todoItem = {
      index: generateKey(),
      content,
      status,
      priority,
    };
    return todoItem;
  };

  const addTodoItem = (content, status, priority) => {
    const todoItem = _createTodoItem(content, status, priority);
    _todoItems.set(todoItem.index, todoItem);
    _setState();
  };

  const removeTodoItem = ({ index }) => {
    _todoItems.delete(index);
    _setState();
  };

  const updateTodoItem = ({ index, content, status }) => {
    const todoItem = _todoItems.get(index);
    todoItem.content = content;
    todoItem.status = status ?? '';

    _todoItems.set(todoItem.index, todoItem);
    _setState();
  };

  const setFilter = (filterType) => {
    _currentFilter = filterType;
    _setState();
  };

  const _setState = () => {
    const filteredItems = Array.from(_todoItems.values()).filter(
      _filterStatusPredicate[_currentFilter]
    );

    todoListHandler.refresh(filteredItems);
    todoStatusHandler.updateCount(filteredItems.length);
  };

  const todoInputHandler = todoInput(addTodoItem);
  const todoListHandler = todoList($listUl, updateTodoItem, removeTodoItem);
  const todoStatusHandler = todoStatus($listUl, setFilter);

  const init = () => {
    todoListHandler.refresh(Array.from(_todoItems.values));
    todoInputHandler.focus();
  };

  return {
    init,
  };
};

export { todoApp };
