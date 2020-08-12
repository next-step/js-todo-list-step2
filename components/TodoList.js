import { todoItemTemplate } from '../template.js';
import { isValidContent, isArray } from '../util.js';
import { KEYCODE_ESC, KEYCODE_ENTER } from '../constants.js';

function TodoList({ deleteTodo, toggleTodo, editTodo, setRootState }) {
  this.todoItems = [];
  const $todoList = document.querySelector('#todo-list');

  this.setState = (updatedTodoItems) => {
    this.todoItems = updatedTodoItems;
    this.render(this.todoItems);
  };

  this.render = (items) => {
    if (!isArray(items)) return;
    const template = items.map(todoItemTemplate);
    $todoList.innerHTML = template.join('');
  };

  const onClickTodoItem = (event) => {
    const { classList } = event.target;
    const { id } = event.target.closest('li');
    if (classList.contains('destroy')) {
      deleteTodo(id);
      setRootState();
    }
    if (classList.contains('toggle')) {
      toggleTodo(id);
      setRootState();
    }
  }

  $todoList.addEventListener('click', onClickTodoItem);

  const onDoubleClickTodoItem = (event) => {
    const $li = event.target.closest('li');
    $li.classList.add('editing');

    const [$editInput] = Array.from($li.getElementsByClassName('edit'));
    const originValue = (
      this.todoItems.find((item) => item._id === $li.id) || {}
    ).contents;
    $editInput.value = originValue || '';
    $editInput.focus();
    const { length } = $editInput.value;
    $editInput.setSelectionRange(length, length); // set cursor position
  }

  $todoList.addEventListener('dblclick', onDoubleClickTodoItem);

  const onEditTodoItem = (event) => {
    if (event.key !== KEYCODE_ESC && event.key !== KEYCODE_ENTER) return;

    const $li = event.target.closest('li');
    if (event.key === KEYCODE_ESC) {
      $li.classList.remove('editing');
    }
    const newTodoContents = event.target.value;
    if (!isValidContent(newTodoContents)) return;
    if (event.key === KEYCODE_ENTER) {
      editTodo($li.id, newTodoContents);
      setRootState();
    }
  }

  $todoList.addEventListener('keyup', onEditTodoItem);
}

export default TodoList;
