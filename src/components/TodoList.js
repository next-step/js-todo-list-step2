import { $ } from '../utils/selectors.js';

function todoItemTemplate({ _id, contents, isCompleted, priority }) {
  return `
  <li data-id=${_id} class=${isCompleted ? 'completed' : ''}>
    <div class="view">
      <input class="toggle" type="checkbox" ${isCompleted ? 'checked' : ''}>
      <label class="label">
        ${
          priority === 'NONE'
            ? `       
          <select class="chip select">
            <option value="0" selected="">순위</option>
            <option value="1">1순위</option>
            <option value="2">2순위</option>
          </select>
          `
            : `
          <span class="chip ${priority === 'FIRST' ? 'primary' : 'secondary'}">
          ${priority === 'FIRST' ? '1' : '2'}순위
          </span>`
        }
        ${contents}
      </label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${contents}">
  </li>
  `;
}

function TodoList({ deleteTodo, completeToggle, prioritySelect, editTodo, updateTodo }) {
  const todoList = $('.todo-list');
  this.render = todoData => {
    if (todoData.length === 0) return (todoList.innerHTML = '데이터 없음');
    todoList.innerHTML = todoData.map(todo => todoItemTemplate(todo)).join('');
    this.event();
  };
  this.event = () => {
    todoList.addEventListener('click', deleteTodo);
    todoList.addEventListener('click', completeToggle);
    todoList.addEventListener('change', prioritySelect);
    todoList.addEventListener('dblclick', editTodo);
    todoList.addEventListener('keydown', updateTodo);
  };
}

export default TodoList;
