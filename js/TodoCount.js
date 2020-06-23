import api from './util/api.js';

export default class TodoCount {
  constructor({ data, username, $targetTodoCountContainer }) {
    this.data = data;
    this.username = username;
    this.$targetTodoCountContainer = $targetTodoCountContainer;

    this.render();
  }
  setState(selectedUsername) {
    this.username = selectedUsername;
    this.render();
  }
  async render() {
    const response = await api.fetchUserTodo(this.username);
    this.data = response.todoList;
    console.log(this.data);

    const completedData = this.data && this.data.filter((todo) => todo.isCompleted === true);
    this.$targetTodoCountContainer.innerHTML = `
      <span id="todo-count" class="todo-count">
        총 <span class="count">${this.data.length}</span> 개 중
      </span>
      <span id="completed-count" class="todo-count">
        <span class="count">${completedData.length}</span> 개 완료
      </span>    
    `;
  }
}
