import { MEANING } from './constants.js';

export const TodoCountTemplate = (todoCount, completedCount) => `
      <span id="todo-count" class="todo-count">
        총 <span class="count"><strong>${todoCount}</strong></span> 개 중
      </span>
      <span id="completed-count" class="todo-count">
        <span class="count">${completedCount}</span> 개 완료
      </span>
      <button class="clear-all">모두 삭제</button>
  `;

const PRIORITY = {
  [MEANING.NOTHING]: `<select class="chip select">
                        <option value="0" selected>순위</option>
                        <option value="1">1순위</option>
                        <option value="2">2순위</option>
                      </select>`,
  [MEANING.PRIMARY]: `<div class="chip-container">
                        <span class="chip primary">1순위</span>
                        <span class="delete">초기화</span>
                      </div>`,
  [MEANING.SECONDARY]: `<div class="chip-container">
                          <span class="chip secondary">2순위</span>
                          <span class="delete">초기화</span>
                        </div>`,
};

export const TodoListTemplate = (todoList) =>
  todoList
    .map(
      (todo) => `
      <li ${todo.isCompleted ? 'class=completed' : ''} data-id=${todo._id}>
        <div class="view">
          <input class="toggle" type="checkbox" ${
            todo.isCompleted ? 'checked' : ''
          } />
          <label class="label">
            ${PRIORITY[todo.priority]}
            ${todo.contents}
          </label>
          <button class="destroy"></button>
        </div>
        <input class="edit" placeholder=${todo.contents} value="" />
      </li>
`,
    )
    .join('');

export const UserTitleTemplate = (username) => `
  <div><strong>${username}</strong>'s</div>
  <div>Todo List</div>
`;

export const UserListTemplate = (username, userArray) =>
  userArray
    .map((user) => {
      return `<button class="${
        user.name === username ? 'ripple active' : 'ripple'
      }">${user.name}</button>`;
    })
    .join('');

export const LoadingTemplate = `
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
  </li>`;
