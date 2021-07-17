function todoItemTemplate({ _id, contents }) {
  return `
  <li data-id=${_id}>
    <div class="view">
      <input class="toggle" type="checkbox">
      <label class="label">
        <select class="chip select">
          <option value="0" selected="">순위</option>
          <option value="1">1순위</option>
          <option value="2">2순위</option>
        </select>
        ${contents}
      </label>
      <button class="destroy" data-id=${_id}></button>
    </div>
    <input class="edit" value="${contents}">
  </li>
  `;
}

function TodoList({ deleteTodo }) {
  const todoList = document.querySelector('.todo-list');
  this.render = todoData => {
    if (todoData.length === 0) return (todoList.innerHTML = '데이터 없음');
    todoList.innerHTML = todoData.map(todo => todoItemTemplate(todo)).join('');
    this.event();
  };
  this.event = () => {
    todoList.addEventListener('click',deleteTodo)
  };
}

export default TodoList;
