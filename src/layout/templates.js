'use strict';

import { PRIORITY_CLASSLIST } from '../constant/constants.js';

const priorityTemplate = priority => {
  return `
    <select class="chip select ${PRIORITY_CLASSLIST[priority]}" >
      <option value="0" ${priority === 'NONE' && 'selected'}>순위</option>
      <option value="1" ${priority === 'FIRST' && 'selected'}>1순위</option>
      <option value="2" ${priority === 'SECOND' && 'selected'}>2순위</option>
    </select>`;
};

export const todoItemTemplate = item => {
  return `
  <li data-id=${item._id} class="todo-item ${
    item.isCompleted ? 'completed' : ''
  }">
    <div class="view">
      <input class="toggle" type="checkbox" ${
        item.isCompleted ? 'checked' : ''
      }/>
      <label class="label">
        ${priorityTemplate(item.priority)}
        <span class="todo-item__contents">${item.contents}</span>
      </label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${item.contents}" />
	</li>`;
};

export const progressTemplate = () => {
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
  </li>`;
};

export const userButtonTemplate = ({ name, _id }) => {
  return `<button class="ripple" id=${_id}>${name}</button>`;
};

export const addDeleteButtonTemplate = () => {
  return `
    <button class="ripple user-create-button">+ 유저 생성</button>
    <button class="ripple user-delete-button">- 유저 삭제</button>
  `;
};

export const userTitleTemplate = userName => {
  return `
  <span>
    <strong>${userName}</strong>'s Todo List
  </span>
`;
};
