import { todoItemTemplate } from '../template.js';
import { isValidContents } from '../util.js';
import { KEYCODE_ESC, KEYCODE_ENTER } from '../constants.js';

function TodoList({ deleteTodo, toggleTodo, editTodo }) {
  this.todoItems = [];
  const $todoList = document.querySelector('#todo-list');

  this.setState = (updatedTodoItems) => {
    this.todoItems = updatedTodoItems;
    this.render(this.todoItems);
  };

  this.render = (items) => {
    const template = items.map(todoItemTemplate);
    $todoList.innerHTML = template.join('');
  };

  $todoList.addEventListener('click', (event) => {
    const { className } = event.target;
    const { id } = event.target.closest('li');
    if (className === 'destroy') {
      deleteTodo(id);
    } else if (className === 'toggle') {
      toggleTodo(id);
    }
  });

  $todoList.addEventListener('dblclick', (event) => {
    const $li = event.target.closest('li');
    $li.classList.add('editing');

    const [$editInput] = Array.from($li.getElementsByClassName('edit'));
    const originValue = (
      this.todoItems.find((item) => item._id === $li.id) || {}
    ).contents;
    $editInput.value = originValue;
    $editInput.focus();
    const size = $editInput.value.length;
    $editInput.setSelectionRange(size, size); // set cursor position
  });

  $todoList.addEventListener('keypress', (event) => {
    if (event.key !== KEYCODE_ESC && event.key !== KEYCODE_ENTER) return;

    const $li = event.target.closest('li');
    if (event.key === KEYCODE_ESC) {
      $li.classList.remove('editing');
    }
    const newTodoContents = event.target.value;
    if (!isValidContents(newTodoContents)) return;
    if (event.key === KEYCODE_ENTER) {
      editTodo($li.id, newTodoContents);
    }
  });
}

export default TodoList;
