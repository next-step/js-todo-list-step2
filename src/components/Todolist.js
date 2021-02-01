import TodoItem from './TodoItem.js';
import selectedUserStore, {
  GET_USER,
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO_CONTENTS,
} from '../modules/selectedUser.js';

const Todolist = () => {
  const $todolist = document.querySelector('ul.todo-list');
  const { render: todoItemRender } = TodoItem();

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

  const onOpenTodoEdit = (e) => {
    const closestLi = e.target.closest('li');
    console.log(closestLi);
    const inputEdit = closestLi.querySelector('input.edit');
    inputEdit.style.display = 'block';
    inputEdit.focus();
    // 캐럿 위치 끝으로 이동
    inputEdit.setSelectionRange(inputEdit.value.length, inputEdit.value.length);
    closestLi.querySelector('div.view').style.display = 'none';
  };

  const onKeyupTodoEdit = (e) => {
    const closestLi = e.target.closest('li');

    const switchBackToView = () => {
      closestLi.querySelector('div.view').style.display = 'block';
      closestLi.querySelector('input.edit').style.display = 'none';
    };

    if (e.target.classList.contains('edit')) {
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
    }
  };

  $todolist.addEventListener('click', onDeleteTodo);
  $todolist.addEventListener('dblclick', onOpenTodoEdit);
  $todolist.addEventListener('keyup', onKeyupTodoEdit);

  selectedUserStore.subscribe(GET_USER, render);
  selectedUserStore.subscribe(ADD_TODO, render);
  selectedUserStore.subscribe(DELETE_TODO, render);
  selectedUserStore.subscribe(EDIT_TODO_CONTENTS, render);
};

export default Todolist;
