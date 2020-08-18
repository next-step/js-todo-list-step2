import { PRIORITY } from '../utils/constant.js';

export const todoTitleHTML = (userName) => `
  <span><strong>${userName}</strong>'s Todo List</span>`;

export const userButtonHTML = (userName, selectedName) => `
  <button class="ripple ${userName === selectedName ? 'active' : ''}">
    ${userName}
  </button>`;

export const todoItemHTML = (todo) => `
  <li id=${todo._id} class=${todo.isCompleted && 'completed'}>
    <div class="view">
      <input class="toggle" type="checkbox" ${todo.isCompleted && 'checked'}/>
      <label class="label">
        ${
          todo.priority === PRIORITY.NONE
            ? prioritySelectHTML()
            : priorityLabelHTML(Number(todo.priority))
        }
        ${todo.contents}
      </label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value=${todo.contents} />
  </li>`;

const prioritySelectHTML = () => `
  <select class="chip select">
    <option value="0" selected>선택</option>
    <option value="1">1순위</option>
    <option value="2">2순위</option>
  </select>`;

const priorityLabelHTML = (priority) => {
  return priority === PRIORITY.PRIMARY
    ? `<span class="chip primary">1순위</span>`
    : `<span class="chip secondary">2순위</span>`;
};

export const loadingViewHTML = () => `
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

export const todoCountHTML = (count) => `총 <strong>${count}</strong> 개`;
