import { todoItemStore } from './store.js';

const $todoApp = document.querySelector('section.todoapp');
const $listContainer = $todoApp.querySelector('section.main');
const $listUl = $listContainer.querySelector('.todo-list');

const todoApp = (userList, todoInput, todoList, todoStatus) => {
  let _todoItems = new Map();
  let _currentFilter = 'all';

  const _store = todoItemStore();

  const _filterStatusPredicate = {
    //TODO sync with todoStatus.js/filters
    all: () => true,
    completed: ({ isCompleted }) => isCompleted,
    active: ({ isCompleted }) => !isCompleted,
  };

  const addTodoItem = async (contents) => {
    await _store.createTodo(contents);
    _setState();
  };

  const removeTodoItem = async ({ _id }) => {
    await _store.deleteTodo(_id);
    _setState();
  };

  const updateTodoContents = async ({ _id, contents }) => {
    await _store.updateTodoContents(_id, contents);
    _setState();
  };

  const updateToggle = async ({ _id }) => {
    await _store.updateTodoToggle(_id);
    _setState();
  };

  const setFilter = (filterType) => {
    _currentFilter = filterType;
    _setState();
  };

  const _setState = async () => {
    todoListHandler.loading();
    const todoList = await _store.getTodoList();
    _applyFilter(todoList);
  };

  const _applyFilter = (todoList) => {
    const filteredItems = todoList.filter(
      _filterStatusPredicate[_currentFilter]
    );
    todoListHandler.refresh(filteredItems);
    todoStatusHandler.updateCount(filteredItems.length);
  };

  const userListHandler = userList(_setState);
  const todoInputHandler = todoInput(addTodoItem);
  const todoListHandler = todoList(
    $listUl,
    updateTodoContents,
    updateToggle,
    removeTodoItem
  ); //TODO too many arguments
  const todoStatusHandler = todoStatus($listUl, setFilter);

  const init = () => {
    userListHandler.init();
    todoListHandler.refresh(Array.from(_todoItems.values));
    todoInputHandler.focus();
  };

  return {
    init,
  };
};

export { todoApp };
