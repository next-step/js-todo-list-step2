import { userStore, todoItemStore } from './store.js';

const $todoApp = document.querySelector('section.todoapp');
const $listContainer = $todoApp.querySelector('section.main');
const $listUl = $listContainer.querySelector('.todo-list');

const todoApp = (userList, todoInput, todoList, todoStatus) => {
  let _currentFilter = 'all';

  const _todoItemStore = todoItemStore();
  const _userStore = userStore();

  const getUsers = () => {
    return _userStore.getUsers();
  };

  const addUser = async (name) => {
    await _userStore.createUser(name);
    _setUserListState();
  };

  const removeUser = async () => {
    await _userStore.deleteUser();
    _setUserListState();
    todoListHandler.refresh([]);
    userListHandler.setTitleName();
  };

  const selectUser = async (userId) => {
    const user = await _userStore.setUser(userId);
    _setTodoListState();
    userListHandler.setTitleName(user.name);
  };

  const _setUserListState = () => {
    const userList = getUsers();
    userListHandler.listUsers(userList);
  };

  const _filterStatusPredicate = {
    //TODO sync with todoStatus.js/filters
    all: () => true,
    completed: ({ isCompleted }) => isCompleted,
    active: ({ isCompleted }) => !isCompleted,
  };

  const addTodoItem = async (contents) => {
    await _todoItemStore.createItem(contents);
    _setTodoListState();
  };

  const removeTodoItem = async ({ _id }) => {
    await _todoItemStore.deleteItem(_id);
    _setTodoListState();
  };

  const updateItemContents = async ({ _id, contents }) => {
    await _todoItemStore.updateItemContents(_id, contents);
    _setTodoListState();
  };

  const updateToggle = async ({ _id }) => {
    await _todoItemStore.updateItemToggle(_id);
    _setTodoListState();
  };

  const setFilter = (filterType) => {
    _currentFilter = filterType;
    _setTodoListState();
  };

  const _setTodoListState = async () => {
    todoListHandler.loading();
    const todoList = await _todoItemStore.getItemList();
    _applyFilter(todoList);
  };

  const _applyFilter = (todoList) => {
    const filteredItems = todoList.filter(
      _filterStatusPredicate[_currentFilter]
    );
    todoListHandler.refresh(filteredItems);
    todoStatusHandler.updateCount(filteredItems.length);
  };

  const userListHandler = userList(addUser, removeUser, selectUser);
  const todoInputHandler = todoInput(addTodoItem);
  const todoListHandler = todoList(
    $listUl,
    updateItemContents,
    updateToggle,
    removeTodoItem
  ); //TODO too many arguments
  const todoStatusHandler = todoStatus($listUl, setFilter);

  const init = async () => {
    await _userStore.refresh();
    _setUserListState();
  };

  return {
    init,
  };
};

export { todoApp };
