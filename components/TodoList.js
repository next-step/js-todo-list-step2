import { todoItemTemplate } from '../util.js';
import { isValidContents } from '../util.js';

function TodoList({ deleteTodo, toggleTodo, toggleEditMode, editTodo }) {
  this.todoItems = [];
  this.$todoList = document.querySelector("#todo-list");

  this.setState = updatedTodoItems => {
    this.todoItems = updatedTodoItems;
    this.render(this.todoItems);
  };

  this.render = items => {
    const template = items.map(todoItemTemplate);
    this.$todoList.innerHTML = template.join("");
  };

  this.$todoList.addEventListener('click', event => {
    const { className } = event.target;
    const { id } = event.target.closest('li');
    if (className === 'destroy') {
      deleteTodo(id);
    } else if (className === 'toggle') {
      toggleTodo(id);
    }
  });

  this.$todoList.addEventListener('dblclick', event => {
    const { id } = event.target.closest('li');
    toggleEditMode(id);

    // for focus input & set cursor position
    const $list = document.getElementById(id);
    const [$editInput] = Array.from($list.getElementsByClassName('edit'));
    const size = $editInput.valuevent.length;
    $editInput.focus();
    $editInput.setSelectionRange(size, size);
  });

  this.$todoList.addEventListener('keyup', event => {
    const { id } = event.target.closest('li');
    if (event.key === KEYCODE_ESC) {
      toggleEditMode(id);
    }
    const newTodoContents = event.target.value;
    if (isValidContents(newTodoContents)) return;
    if (event.key === KEYCODE_ENTER) {
      editTodo(id, newTodoContents);
    }
  });
}

export default TodoList;