import store from './store.js';

const $todoApp = document.querySelector('section.todoapp');
const $listContainer = $todoApp.querySelector('section.main');
const $listUl = $listContainer.querySelector('.todo-list');

const todoApp = (userList, todoInput, todoList, todoStatus) => {
  let _todoItems = new Map();
  let _currentFilter = 'all';

  const _filterStatusPredicate = {
    //TODO sync with todoStatus.js/filters
    all: () => true,
    completed: ({ isCompleted }) => isCompleted,
    active: ({ isCompleted }) => !isCompleted,
  };

  const addTodoItem = (contents) => {
    store()
      .createTodo(contents)
      .then(() => _setState());
  };

  const removeTodoItem = ({ _id }) => {
    store()
      .deleteTodo(_id)
      .then(() => _setState());
  };

  const updateTodoContents = ({ _id, contents }) => {
    store()
      .updateTodoContents(_id, contents)
      .then(() => _setState());
  };

  const updateTodoPriority = ({ _id, priority }) => {
    store()
      .updateTodoPriority(_id, priority)
      .then(() => _setState());
  };

  const updateToggle = ({ _id }) => {
    store()
      .updateTodoToggle(_id)
      .then((todo) => {
        console.log(todo);
        _setState();
      });
  };

  const setFilter = (filterType) => {
    _currentFilter = filterType;
    _setState();
  };

  async function _setState() {
    await store()
      .getTodoList()
      .then((todoList) => {
        const filteredItems = todoList.filter(
          _filterStatusPredicate[_currentFilter]
        );
        todoListHandler.refresh(filteredItems);
        todoStatusHandler.updateCount(filteredItems.length); //TODO inline
      });
  }

  const userListHandler = userList(_setState);
  const todoInputHandler = todoInput(addTodoItem);
  const todoListHandler = todoList(
    $listUl,
    updateTodoContents,
    updateTodoPriority,
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
