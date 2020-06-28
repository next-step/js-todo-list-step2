import { KEYCODE_ENTER } from '../constants.js';
import { isValidContents } from '../util.js';

function TodoInput({ addTodo }) {
  const $todoInput = document.querySelector("#new-todo-input");

  $todoInput.addEventListener("keypress", event => this.addTodoItem(event));

  this.addTodoItem = event => {
    if (event.key !== KEYCODE_ENTER) return;

    const newTodoContents = event.target.value;
    if (!isValidContents(newTodoContents)) return;
    
    addTodo(newTodoContents);
    $todoInput.value = "";
  };
}

export default TodoInput;