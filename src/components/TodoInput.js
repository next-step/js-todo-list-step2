import { $ } from '../utils/selectors.js';

function TodoInput({ addTodo }) {
  this.render = () => {
    const todoInput = $('.new-todo');
    todoInput.addEventListener('keyup', addTodo);
  };
}
export default TodoInput;
