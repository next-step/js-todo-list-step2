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
    $todoapp.appendChild(this.$section);
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
    this.mounted();
  }
  mounted() {
    this.$target.querySelectorAll("li").forEach($li => {
      $li.addEventListener("click", (e) => {
          const { id } = e.target.closest("li").dataset;
          const className = e.target.className;
          this.onClick(id, className);
      });
      $li.addEventListener("dblclick", (e) => {
        this.onDbClick(e.target);
      });
      $li.addEventListener("change", (e) => {
        const { id } = e.target.closest("li").dataset;
        this.onChange(id, e.target.value)
      });
    })
  }
}

export default Todolist;
