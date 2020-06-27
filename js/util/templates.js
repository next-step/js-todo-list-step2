import { MEANING } from './constants.js';

export const TODOCOUNT = (data, filteredData) => {
  return `
      <span id="todo-count" class="todo-count">
        총 <span class="count"><strong>${data.length}</strong></span> 개 중
      </span>
      <span id="completed-count" class="todo-count">
        <span class="count">&nbsp;&nbsp;${filteredData.length}</span> 개 완료
      </span>
      <button class="clear-all">모두 삭제</button>
  `;
};

const CHIP = (priority) => {
  return `
      <div class="chip-container">
        <span class="chip ${
          priority === MEANING.PRIMARY
            ? 'primary'
            : priority === MEANING.SECONDARY
            ? 'secondary'
            : ''
        }">${priority}순위</span>
        <span class="delete">초기화</span>
      </div>`;
};

const PRIORITY = {
  [MEANING.NOTHING]: `<select class="chip select">
                        <option value="0" selected>순위</option>
                        <option value="1">1순위</option>
                        <option value="2">2순위</option>
                      </select>`,
  [MEANING.PRIMARY]: CHIP(MEANING.PRIMARY),
  [MEANING.SECONDARY]: CHIP(MEANING.SECONDARY),
};

export const TODOLIST = (data) => {
  const result = data
    .map((todo) => {
      return `
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
  `;
    })
    .join('');
  return result;
};

export const USERTITLE = (username) => {
  const result = `
    <div><strong>${username}</strong>'s</div>
    <div>Todo List</div>
  `;
  return result;
};

export const USERLIST = (username, userArray) => {
  const result = userArray
    .map((user) => {
      return `<button class="${
        user.name === username ? 'ripple active' : 'ripple'
      }">${user.name}</button>`;
    })
    .join('');
  return result;
};

export const LOADING = `
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
