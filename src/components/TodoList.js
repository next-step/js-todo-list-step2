function todoItemTemplate(todo) {
  return `
  <li>
    <div class="view">
      <input class="toggle" type="checkbox">
      <label class="label">
        <select class="chip select">
          <option value="0" selected="">순위</option>
          <option value="1">1순위</option>
          <option value="2">2순위</option>
        </select>
        해야할 아이템
      </label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="완료된 타이틀">
  </li>
  `;
}

function TodoList() {
  this.render = todoData => {
    const todoList = document.querySelector('.todo-list');
    if(todoData.length === 0) return todoList.innerHTML="데이터 없음"
    todoList.innerHTML = todoData.map(todo=>todoItemTemplate(todo)).join('')
  };
}

export default TodoList;
