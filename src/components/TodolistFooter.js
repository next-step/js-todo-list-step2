import selectedUserStore, {
  ADD_TODO,
  DELETE_TODO,
  GET_TODO,
  EDIT_TODO_CONTENTS,
  GET_USER,
  FILTER_ACTIVE,
  FILTER_COMPLETE,
  DELETE_ALL,
} from '../modules/selectedUser.js';

const TodolistFooter = () => {
  const $todoCount = document.querySelector('span.todo-count strong');
  const $showAllButton = document.querySelector('ul.filters a.all');
  const $showActiveButton = document.querySelector('ul.filters a.active');
  const $showCompleteButton = document.querySelector('ul.filters a.completed');
  const $deleteAllButton = document.querySelector('button.clear-completed');

  const renderTodoCount = () => {
    const count = selectedUserStore.getState().todoList.length;
    $todoCount.innerText = count;
  };

  const toggleFilterSelection = (buttonType) => {
    [$showAllButton, $showActiveButton, $showCompleteButton].map((btn) =>
      btn.classList.remove('selected'),
    );
    buttonType === 'all' ? $showAllButton.classList.add('selected') : null;
    buttonType === 'active' ? $showActiveButton.classList.add('selected') : null;
    buttonType === 'completed' ? $showCompleteButton.classList.add('selected') : null;
  };

  const onClickShowAll = () => {
    const userId = selectedUserStore.getState()._id;
    toggleFilterSelection('all');
    selectedUserStore.dispatch({ type: GET_TODO, payload: { userId } });
  };

  const onClickShowActive = () => {
    const userId = selectedUserStore.getState()._id;
    toggleFilterSelection('active');
    selectedUserStore.dispatch({ type: FILTER_ACTIVE, payload: { userId } });
  };

  const onClickShowComplete = () => {
    const userId = selectedUserStore.getState()._id;
    toggleFilterSelection('completed');
    selectedUserStore.dispatch({ type: FILTER_COMPLETE, payload: { userId } });
  };

  const onClickDeleteAll = (e) => {
    const userId = selectedUserStore.getState()._id;
    selectedUserStore.dispatch({ type: DELETE_ALL, payload: { userId } });
  };

  $showAllButton.addEventListener('click', onClickShowAll);
  $showActiveButton.addEventListener('click', onClickShowActive);
  $showCompleteButton.addEventListener('click', onClickShowComplete);
  $deleteAllButton.addEventListener('click', onClickDeleteAll);

  selectedUserStore.subscribe(ADD_TODO, renderTodoCount);
  selectedUserStore.subscribe(DELETE_TODO, renderTodoCount);
  selectedUserStore.subscribe(EDIT_TODO_CONTENTS, renderTodoCount);
  selectedUserStore.subscribe(GET_USER, renderTodoCount);
  selectedUserStore.subscribe(GET_TODO, renderTodoCount);
  selectedUserStore.subscribe(FILTER_ACTIVE, renderTodoCount);
  selectedUserStore.subscribe(FILTER_COMPLETE, renderTodoCount);
  selectedUserStore.subscribe(DELETE_ALL, renderTodoCount);
};

export default TodolistFooter;
