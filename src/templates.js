import { FIRST, NONE } from './constants.js';

export const userTemplate = (user, currentUserId) => {
  const { _id, name } = user;
  return `<button class="ripple ${_id === currentUserId ? 'active' : ''}" id=${_id}>${name}</button>`;
};

export const userControlButtonTemplate = `
  <button class="ripple user-create-button">
    + 유저 생성
  </button>
  <button class="ripple user-delete-button">
    삭제 -
  </button>
`;

export const todoItemTemplate = ({ _id, contents, isCompleted, priority }) => {
  const selectTemplate = `
    <select class="chip select">
      <option value="0" selected>순위</option>
      <option value="1">1순위</option>
      <option value="2">2순위</option>
    </select>
  `;

  const priorityTemplate = `
    <span class="chip ${priority === FIRST ? 'primary' : 'secondary'}">
      ${priority === FIRST ? '1' : '2'}순위
    </span>
  `;

  return `
    <li id="${_id}" class="${isCompleted ? 'completed' : ''}">
      <div class="view">
        <input id="${_id}" class="toggle" type="checkbox" ${isCompleted ? 'checked' : ''}/>
        <label class="label">
          ${priority === NONE ? selectTemplate : priorityTemplate}
          ${contents}
        </label>
        <button id="${_id}" class="destroy"></button>
      </div>
      <input class="edit" value="${contents}" />
    </li>
  `;
};
