import Component from "../core/Component.js";

import { Constants } from "../utils/constants.js";

export default class TodoListItem extends Component {
  todoListItemPrioritySelector() {
    return `
      <select class="chip select" data-action="selectPriority">
        <option value="NONE" selected>순위</option>
        <option value="FIRST">1순위</option>
        <option value="SECOND">2순위</option>
      </select>
    `;
  }

  todoListItemPriority(priority) {
    const { className, text } = Object.values(Constants).find(
      ({ value }) => value === priority
    );
    return `
      <span class="chip ${className}">${text}</span>
    `;
  }

  renderPriority(priority) {
    if (priority === "NONE") {
      return this.todoListItemPrioritySelector();
    } else {
      return this.todoListItemPriority(priority);
    }
  }

  render() {
    const { _id, contents, priority, iscompleted } = this.props;

    return `
      <li class="${iscompleted ? "completed" : ""}" data-id="${_id}">
        <div class="view">
          <input 
            class="toggle" 
            type="checkbox" 
            ${iscompleted ? "checked" : ""}
            data-action="toggleTodo"
          />
          <label class="label" data-action="toggleEditingTodo">
            ${this.renderPriority(priority)}
            ${contents}
          </label>
          <button class="destroy" data-action="deleteTodo"></button>
        </div>
        <input class="edit" value="${contents}" />
      </li>
    `;
  }
}
