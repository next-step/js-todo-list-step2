import api from './util/api.js';
import * as templates from './util/templates.js';
import { DEFAULT_USER } from './util/constants.js';

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
    if (this.username !== DEFAULT_USER) {
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
}
