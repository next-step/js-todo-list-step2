import Component from "../../core/Component.js";

export default class TodoList extends Component {
  render() {
    console.log(this.store.todoList);
    const todoListView = this.store.todoList
      .map(({ _id, contents, isCompleted, priority }) => {
        return `
        <li class=${isCompleted && "completed"}>
          <div class="view" data-todo-id=${_id}>
            <input class="toggle" type="checkbox" ${isCompleted && "checked"}/>
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

  setChipView(priority) {
    switch (priority) {
      case "1순위":
        return `<span class="chip primary">1순위</span>`;
      case "2순위":
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
