import { putCompleteTodo } from "../../api/api.js";
import Component from "../../core/Component.js";
import { PRIORITY_TYPE, TODO_BUTTONS } from "../../utils/constants.js";
import { $, checkClassList } from "../../utils/utils.js";

export default class TodoList extends Component {
  render() {
    const todoListView = this.store.filteredTodoList
      .map(({ _id, contents, isCompleted, priority }) => {
        return `
        <li class=${isCompleted && "completed"}>
          <div class="view" data-todo-id=${_id}>
            <input data-todo-id=${_id} class="toggle" type="checkbox" ${isCompleted && "checked"}/>
            <label class="label">
              ${this.setChipView(priority)}
              ${contents}
            </label>
            <button class="destroy" data-todo-id=${_id}></button>
          </div>
          <input class="edit" value=${contents} data-todo-id=${_id} />
        </li>
      `;
      })
      .join("");
    this.$target.innerHTML = todoListView;
  }

  bindEvents() {
    this.$target.addEventListener("click", (e) => this.onClickCheckbox(e));
  }

  async onClickCheckbox({ target }) {
    const todoId = target.dataset.todoId;
    checkClassList(target, TODO_BUTTONS.TOGGLE) && (await this.checkTodo(todoId));
  }

  async checkTodo(todoId) {
    const todo = await putCompleteTodo(this.props.userStore.selectedUserId, todoId);
    this.store.editTodoList(todo._id, todo);
    this.store.notifyObservers();
  }

  setChipView(priority) {
    switch (priority) {
      case PRIORITY_TYPE.FIRST:
        return `<span class="chip primary">1순위</span>`;
      case PRIORITY_TYPE.SECOND:
        return `<span class="chip secondary">2순위</span>`;
      default:
        return `
          <select class="chip select">
            <option value="0" selected>순위</option>
            <option value="1">1순위</option>
            <option value="2">2순위</option>
          </select>
        `;
    }
  }
}
