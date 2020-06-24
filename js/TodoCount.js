import api from './util/api.js';
import * as templates from './util/templates.js';

export default class TodoCount {
  constructor({ username, $targetTodoCountContainer }) {
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
    const data = response.todoList;
    const completedData =
      data && data.filter((todo) => todo.isCompleted === true);
    this.$targetTodoCountContainer.innerHTML = templates.TODOCOUNT(
      data,
      completedData,
    );
  }
}
