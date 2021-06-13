import { EVENT } from "../../const/COMMON.js";
import { ACTION, CLASS_NAME, PRIORITY, PRIORITY_LABEL } from "../../const/TODO.js";
import { addClassName, removeClassname, todoItem } from "../../utils/element.js";

class TodoList {
  constructor($todoList) {
    this.$todoList = $todoList;
    this.items = [];
  }

  setState(updatedItems) {
    this.items = updatedItems;
    this.render();
  }

  getPrioritySelector(priority) {
    const priorityLabel = PRIORITY_LABEL[priority];

    if (priority === PRIORITY.NONE) {
      return `
      <select class="chip select" data-action="${ACTION.UPDATE_PRIORITY}">
        <option value="${PRIORITY.NONE}" selected>순위</option>
        <option value="${PRIORITY.FIRST}">1순위</option>
        <option value="${PRIORITY.SECOND}">2순위</option>
      </select>
      `
    }
    return `<span class="chip secondary">${priorityLabel}</span>`
  }

  getItemHtml({ _id, contents, priority, isCompleted }) {
    const completed = isCompleted && 'completed';
    const checked = isCompleted && 'checked';
    const priorityHTML = this.getPrioritySelector(priority);
    
    return `<li id="${_id}" class="todo-item ${completed}">
    <div class="view">
      <input class="toggle ${completed}" data-action="${ACTION.UPDATE_COMPLETED}" type="checkbox" ${ checked } />
      <label id="${_id}" class="label">
        ${ priorityHTML }
        ${contents}
      </label>
      <button id="${_id}" data-action="${ACTION.DELETE_ITEM}" class="destroy"></button>
    </div>
    <input id="${_id}" class="edit" value=${contents} />
  </li>`;

  }

  render() {
    if (!this.items) return;

    this.$todoList.innerHTML = this.items.map(this.getItemHtml.bind(this)).join('');
  }

  onKeyup(updateContents, { key, target }) {
    const { id, value } = target;

    key === EVENT.ENTER && updateContents(id, value);
    key === EVENT.ESCAPE && this.stopEditing(target);
  }

  onChange(updatePriority, target) {
    const { action } = target.dataset;
    action === ACTION.UPDATE_PRIORITY && updatePriority(todoItem(target).id, target.value);
  }

  onClickEvent({updateCompleted, deleteItem}, target) {
    const { action } = target.dataset;
    const itemId = todoItem(target).id;

    action === ACTION.UPDATE_COMPLETED && updateCompleted(itemId, target.checked);

    action === ACTION.DELETE_ITEM && deleteItem(itemId)
  }

  startEditing(target) {
    addClassName(todoItem(target), CLASS_NAME.EDITING)
  }

  stopEditing(target) {
    removeClassname(todoItem(target), CLASS_NAME.EDITING);
  }
  
  setEvent({ updateContents, updateCompleted, updatePriority, deleteItem }) {

    this.$todoList.addEventListener('keyup', ({ key, target }) => this.onKeyup(updateContents, { key, target }));


    this.$todoList.addEventListener('change', ({ target }) => this.onChange(updatePriority, target));

    this.$todoList.addEventListener('dblclick', ({ target }) => this.startEditing(target));

    this.$todoList.addEventListener('click', ({ target }) => this.onClickEvent({ updateCompleted, deleteItem }, target));

  }
}

export default function($todoList) {
  return new TodoList($todoList);
}