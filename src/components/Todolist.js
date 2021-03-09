import TodoItem from './TodoItem.js';
import selectedUserStore, {
  GET_USER,
  ADD_TODO,
  DELETE_TODO,
  GET_TODO,
  EDIT_TODO_CONTENTS,
  TOGGLE_COMPLETE,
  FILTER_ACTIVE,
  FILTER_COMPLETE,
  DELETE_ALL,
  EDIT_PRIORITY,
} from '../modules/selectedUser.js';

const Todolist = () => {
  const $todolist = document.querySelector('ul.todo-list');
  const { render: todoItemRender } = TodoItem();
  const priorities = {
    0: 'NONE',
    1: 'FIRST',
    2: 'SECOND',
  };

  const render = () => {
    const todos = selectedUserStore.getState().todoList;
    $todolist.innerHTML = todos.map((todo) => todoItemRender(todo)).join('\n');
  };

  const onDeleteTodo = ({ target }) => {
    if (target.classList.contains('destroy') && window.confirm('삭제하시겠습니까?')) {
      const closestLi = target.closest('li');
      const userId = selectedUserStore.getState()._id;
      const itemId = closestLi.dataset.id;
      selectedUserStore.dispatch({ type: DELETE_TODO, payload: { userId, itemId } });
    }
  };

  const onOpenTodoEdit = ({ target }) => {
    const closestLi = target.closest('li');
    const inputEdit = closestLi.querySelector('input.edit');
    inputEdit.style.display = 'block';
    inputEdit.focus();
    // 캐럿 위치 끝으로 이동
    inputEdit.setSelectionRange(inputEdit.value.length, inputEdit.value.length);
    closestLi.querySelector('div.view').style.display = 'none';
  };

  const onKeyupTodoEdit = (e) => {
    if (!e.target.classList.contains('edit')) {
      return;
    }

    const closestLi = e.target.closest('li');

    const switchBackToView = () => {
      closestLi.querySelector('div.view').style.display = 'block';
      closestLi.querySelector('input.edit').style.display = 'none';
    };

    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      const userId = selectedUserStore.getState()._id;
      const itemId = closestLi.dataset.id;
      const contents = e.target.value;
      selectedUserStore.dispatch({
        type: EDIT_TODO_CONTENTS,
        payload: {
          userId,
          itemId,
          contents,
        },
      });
    } else if (e.key === 'Escape') {
      switchBackToView();
      e.target.value = closestLi.querySelector('label span').innerText;
    }
  };

  const onToggleComplete = ({ target }) => {
    if (target.type === 'checkbox') {
      const closestLi = target.closest('li');
      const userId = selectedUserStore.getState()._id;
      const itemId = closestLi.dataset.id;
      selectedUserStore.dispatch({
        type: TOGGLE_COMPLETE,
        payload: {
          userId,
          itemId,
        },
      });
      closestLi.classList.toggle('completed');
    }
  };

  const onChangePriority = ({ target }) => {
    if (target.classList.contains('chip')) {
      const { value } = target;
      const closestLi = target.closest('li');
      const userId = selectedUserStore.getState()._id;
      const itemId = closestLi.dataset.id;
      selectedUserStore.dispatch({
        type: EDIT_PRIORITY,
        payload: {
          userId,
          itemId,
          priority: priorities[value],
        },
      });
    }
  };

  $todolist.addEventListener('click', onDeleteTodo);
  $todolist.addEventListener('dblclick', onOpenTodoEdit);
  $todolist.addEventListener('keyup', onKeyupTodoEdit);
  $todolist.addEventListener('click', onToggleComplete);
  $todolist.addEventListener('change', onChangePriority);

  selectedUserStore.subscribe(GET_USER, render);
  selectedUserStore.subscribe(ADD_TODO, render);
  selectedUserStore.subscribe(DELETE_TODO, render);
  selectedUserStore.subscribe(GET_TODO, render);
  selectedUserStore.subscribe(EDIT_TODO_CONTENTS, render);
  selectedUserStore.subscribe(FILTER_ACTIVE, render);
  selectedUserStore.subscribe(FILTER_COMPLETE, render);
  selectedUserStore.subscribe(DELETE_ALL, render);
  selectedUserStore.subscribe(EDIT_PRIORITY, render);
};

export default Todolist;
