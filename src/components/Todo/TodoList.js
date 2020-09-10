import {Component} from "../../core/Component.js";

const loadingContents = `
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

export const TodoList = class extends Component {
  render () {
    const { todoList } = this.$props;
    return `
      ${todoList.map(({contents, priority}) =>  `<li>
        <div class="view">
          <input class="toggle" type="checkbox" />
          <label class="label"> 
          ${(priority === "NONE" || priority === 0) ? `<select class="chip select">
            <option value="0" selected>순위</option>
            <option value="1">1순위</option>
            <option value="2">2순위</option>
          </select>`: 
          (priority === 1) ? `<span class="chip primary">1순위</span>` :
          (priority === 2) ? `<span class="chip secondary">2순위</span>` : ``}
          ${contents}
          </label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${contents}" />
      </li>`).join('')}
    `;
  }
}