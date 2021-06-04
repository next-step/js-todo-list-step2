/* eslint-disable prettier/prettier */
import CONSTANT from "../constants.js";

class Todolist {
  constructor({ $todoapp, onClick }) {
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

    return this.state.activeUserInfo.todoList
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
              <input class="edit" value="완료된 타이틀" />
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
          this.onClick(id, className)
      })
   })
  }
}

/* 
        <section class="main">
          <ul class="todo-list">
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
            <li>
              <div class="view">
                <input class="toggle" type="checkbox" />
                <label class="label">
                  <select class="chip select">
                    <option value="0" selected>순위</option>
                    <option value="1">1순위</option>
                    <option value="2">2순위</option>
                  </select>
                  해야할 아이템
                </label>
                <button class="destroy"></button>
              </div>
              <input class="edit" value="완료된 타이틀" />
            </li>
            <li>
              <div class="view">
                <input class="toggle" type="checkbox" />
                <label class="label">
                  <span class="chip primary">1순위</span>
                  해야할 아이템
                </label>
                <button class="destroy"></button>
              </div>
              <input class="edit" value="완료된 타이틀" />
            </li>
            <li>
              <div class="view">
                <input class="toggle" type="checkbox" />
                <label class="label">
                  <span class="chip secondary">2순위</span>
                  해야할 아이템
                </label>
                <button class="destroy"></button>
              </div>
              <input class="edit" value="완료된 타이틀" />
            </li>
            <li class="completed">
              <div class="view">
                <input class="toggle" type="checkbox" checked />
                <label class="label">완료된 아이템 </label>
                <button class="destroy"></button>
              </div>
              <input class="edit" value="완료된 타이틀" />
            </li>
            <li class="editing">
              <div class="view">
                <input class="toggle" type="checkbox" checked />
                <label class="label">
                  <span class="chip secondary">2순위</span>
                  수정중인 아이템
                </label>
                <button class="destroy"></button>
              </div>
              <input class="edit" value="완료된 타이틀" />
            </li>
          </ul>
        </section> 
        */

export default Todolist;
