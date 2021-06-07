/* eslint-disable prettier/prettier */
import CONSTANT from "../constants.js";

class Todolist {
  constructor({ $todoapp, onClick, onDbClick, onChange }) {
    this.onChange = onChange;
    this.onDbClick = onDbClick;
    this.onClick = onClick;
    this.$section = document.createElement('section');
    this.$section.className = 'main';
    this.$target = document.createElement('ul');
    this.$target.className = 'todo-list';
    this.$section.appendChild(this.$target);
    this.setEvent();
    $todoapp.appendChild(this.$section);
  }

  setEvent() {
    this.$target.addEventListener("click", (event) => this.onClick(event.target.closest("li").dataset.id, event.target.className))
    this.$target.addEventListener("dblclick", (event) => this.onDbClick(event.target))
    this.$target.addEventListener("change", (event) => this.onChange(event.target.closest("li").dataset.id, event.target.value))
  }

  setState(nextState) {
    this.state = { ...this.state, ...nextState };
    this.render();
  }
  template() {
    if (this.state.isLoading) {
      return `
          <li>
            <div class="view">
              <label class="label">
                <div class="animated-background">
                  <div class="skel-mask-container">
                    <div class="skel-mask"></div>
                  </div>
                </div>
              </label>
            </div>
          </li>
    `;
    }

    return this.state.todoList
      .map(({ _id, contents, isCompleted, priority }) => {
        const priorityTemplate = {
          NONE: CONSTANT.NONE_TEMPLATE,
          FIRST: CONSTANT.FIRST_TEMPLATE,
          SECOND: CONSTANT.SECOND_TEMPLATE,
        }[priority];

      return `
            <li ${isCompleted ? 'class="completed"' : ""} data-id=${_id}>
              <div class="view">
                <input class="toggle" type="checkbox" ${isCompleted ? 'checked' : ""}/>
                <label class="label">
                  ${priorityTemplate} 
                  ${contents}
                </label>
                <button class="destroy"></button>
              </div>
              <input class="edit" value="${contents}" />
            </li>`}).join("")
  }
  render() {
    this.$target.innerHTML = this.template();
  }
}

export default Todolist;
