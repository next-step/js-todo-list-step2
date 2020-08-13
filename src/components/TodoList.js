import { VALUE } from "../utils/constants.js";

export default function TodoList($todoList) {
  this.todoLabelTemplate = (todo) => {
    switch (`${todo.priority}`) {
      case VALUE.NON_PRIORITY:
        return `
            <select class="chip select">
              <option value="0" selected>순위</option>
              <option value="1">1순위</option>
              <option value="2">2순위</option>
            </select>
            ${todo.contents}          
          `;
      case VALUE.PRIMARY_PRIORITY:
        return `
            <span class="chip primary">1순위</span>
            ${todo.contents}          
          `;
      case VALUE.SECONDARY_PRIORITY:
        return `
            <span class="chip secondary">2순위</span>
            ${todo.contents}          
          `;
    }
  };

  this.todoTemplate = (todo) => `
    <li class=${todo.isCompleted ? "completed" : ""}>
        <div class="view">
            <input class="toggle" type="checkbox" ${
              todo.isCompleted ? "checked" : ""
            }/>
            <label class="label">
            ${todo.isCompleted ? todo.contents : this.todoLabelTemplate(todo)}
            </label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="완료된 타이틀" />
    </li>
  `;

  this.loadingTemplate = () => `
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

  this.render = (todos, loading) => {
    const template = todos.length ? todos.map(this.todoTemplate) : [];
    $todoList.innerHTML = loading ? this.loadingTemplate() : template.join("");
  };

  this.init = () => {};
}

{
  /* <li class="editing">
              <div class="view">
                <input class="toggle" type="checkbox" checked />
                <label class="label">
                  <span class="chip secondary">2순위</span>
                  수정중인 아이템
                </label>
                <button class="destroy"></button>
              </div>
              <input class="edit" value="완료된 타이틀" />
            </li> */
}
