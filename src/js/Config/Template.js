import { getUserName } from '../Helper/UserHelper.js';

import {
  getTodoItemContents,
  getTodoItemIsCompleted,
  getTodoItemPriority,
  PRIORITY_TEMPLATE,
} from '../Helper/TodoHelper.js';

export const UserButtonTemplate = (user, selected = false) => {
  const userName = getUserName(user);
  return `
    <button
      data-type="user"
      ${Object.keys(user)
        .map((key) => `data-${key}="${user[key]}"`)
        .join('')}
      class="ripple${selected ? ' active' : ''}"
    >
      ${userName}
    </button>
  `;
};

export const UserTitleTemplate = (user) => {
  const userName = getUserName(user);
  return `
    <span>
      <strong>${userName}</strong>'s Todo List
    </span>
  `;
};

export const todoItemTemplate = (todoItem) => {
  const isCompleted = getTodoItemIsCompleted(todoItem);
  const priority = getTodoItemPriority(todoItem);
  const todo = getTodoItemContents(todoItem);
  return `
      <li ${Object.keys(todoItem)
        .map((key) => `data-${key}="${todoItem[key]}"`)
        .join('')}
         ${isCompleted ? `class="completed"` : ``}>
        <div class="view">
          <input class="toggle" type="checkbox" ${
            isCompleted ? `checked` : ''
          } />
          <label class="label">
            ${PRIORITY_TEMPLATE[priority]}
            ${todo}
          </label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${todo}" />
      </li>
    `;
};
