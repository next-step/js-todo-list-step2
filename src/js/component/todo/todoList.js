import { $ } from "../../util/querySelector.js";

export default class TodoList {
  constructor() {}

  $todoList = $(".todo-list");

  render = (todoList) => {
    console.dir(todoList);
    this.$todoList.innerHTML = todoList
      .map(
        (todo) =>
          `<li ${todo.isCompleted ? "class='completed'" : ""} data-todo-id=${
            todo._id
          }>
            <div class="view">
              <input class="toggle" type="checkbox" />
              <label class="label">
                <select class="chip select">
                  <option value="0" selected>순위</option>
                  <option value="1">1순위</option>
                  <option value="2">2순위</option>
                </select>
                ${todo.contents}
              </label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value="완료된 타이틀" />
      </li>`
      )
      .join(" ");
  };
}
