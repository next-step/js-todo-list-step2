import { deleteTodo, editPriority, editTodo, putCompleteTodo } from "../../api/api.js";
import Component from "../../core/Component.js";
import { ALERT_MESSAGE, CONSTRAINTS, KEY_NAME, PRIORITY_TYPE, TODO_BUTTONS } from "../../utils/constants.js";
import { $, checkClassList, confirmAlert } from "../../utils/utils.js";

export default class TodoList extends Component {
  render() {
    this.editing = false;
    const todoListView = this.store.filteredTodoList
      .map(({ _id, contents, isCompleted, priority }) => {
        return `
        <li class=${isCompleted && "completed"}>
          <div class="view" data-todo-id=${_id}>
            <input data-todo-id=${_id} class="toggle" type="checkbox" ${isCompleted && "checked"}/>
            <label class="label" data-todo-id=${_id}>
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
    this.$target.addEventListener("click", (e) => this.onClickTodo(e));

    this.$target.addEventListener("dblclick", (e) => this.onDblclickTodo(e));

    this.$target.addEventListener("keyup", (e) => this.onKeyupTodo(e));

    this.$target.addEventListener("change", (e) => this.onChangePriority(e));
  }

  async onClickTodo({ target }) {
    const todoId = target.dataset.todoId;
    checkClassList(target, TODO_BUTTONS.TOGGLE) && (await this.checkTodo(todoId));

    checkClassList(target, TODO_BUTTONS.DESTROY) &&
      confirmAlert(ALERT_MESSAGE.DELETE_ITEM) &&
      (await this.deleteTodo(todoId));

    this.editing && !checkClassList(target, TODO_BUTTONS.EDIT) && this.toggleEditingStatus(target);
  }

  async onDblclickTodo({ target }) {
    if (checkClassList(target, TODO_BUTTONS.LABEL)) {
      const todoWrapper = target.closest("li");
      todoWrapper.classList.toggle("editing");
      $(".edit", todoWrapper).focus();
      this.editing = true;
    }
  }

  async onKeyupTodo({ target, key }) {
    const todoId = target.dataset.todoId;

    if (key === KEY_NAME.ESCAPE) {
      this.toggleEditingStatus();
      return;
    }

    if (checkClassList(target, TODO_BUTTONS.EDIT) && key === KEY_NAME.ENTER) {
      const todoContent = target.value;

      todoContent.length < CONSTRAINTS && alert(ALERT_MESSAGE.LENGTH_ALERT);
      todoContent.length >= CONSTRAINTS && this.editTodo(todoId, todoContent);
    }
  }

  async onChangePriority({ target }) {
    const todoId = target.closest(".label").dataset.todoId;
    if (checkClassList(target, TODO_BUTTONS.CHIP)) {
      target.value === "1" && this.editPriorityTodo(todoId, PRIORITY_TYPE.FIRST);
      target.value === "2" && this.editPriorityTodo(todoId, PRIORITY_TYPE.SECOND);
    }
  }

  async checkTodo(todoId) {
    const todo = await putCompleteTodo(this.props.userStore.selectedUserId, todoId);
    this.store.editTodoList(todo._id, todo);
    this.store.notifyObservers();
  }

  async deleteTodo(todoId) {
    const { todoList } = await deleteTodo(this.props.userStore.selectedUserId, todoId);
    this.store.deleteTodoList(todoList);
    this.store.notifyObservers();
  }

  async editTodo(todoId, contents) {
    const todoInfo = await editTodo({ contents }, this.props.userStore.selectedUserId, todoId);
    this.store.editTodoList(todoInfo._id, todoInfo);
    this.store.notifyObservers();
  }

  async editPriorityTodo(todoId, priority) {
    const todoInfo = await editPriority({ priority }, this.props.userStore.selectedUserId, todoId);
    this.store.editTodoList(todoInfo._id, todoInfo);
    this.store.notifyObservers();
  }

  toggleEditingStatus() {
    $(".editing", this.$target).classList.toggle("editing");
    this.editing = false;
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
