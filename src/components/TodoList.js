import { Component } from "../core/Component.js";

export const TodoList = class extends Component {
  render () {
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
    `;
  }
}