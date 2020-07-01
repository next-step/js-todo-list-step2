import { filterMap } from "./constants.js";

export const todoListTemplate = (todos) => {
  return todos
    .map((todo) => {
      const contentHtmlString = `
      <div class="view"> 
        <input class="toggle" type="checkbox" ${
          todo.isCompleted ? "checked" : ""
        }>
        <label class="label">${todo.contents}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="${todo.contents}">`;

      const completedClassName = todo.isCompleted ? 'class = "completed"' : "";

      return `<li ${completedClassName} data-id="${todo._id}">${contentHtmlString}</li>`;
    })
    .join("");
};

export const todoCountTemplate = (count) => `총 <strong>${count}</strong> 개`;

export const todoFilterTemplate = (filter) => {
  const allSelected = filter === filterMap.ALL ? " selected" : "";
  const activeSelected = filter === filterMap.ACTIVE ? " selected" : "";
  const completedSelected = filter === filterMap.COMPLETED ? " selected" : "";

  return `
    <li>
      <a class="all${allSelected}" href="#/">전체보기</a>
    </li>
    <li>
      <a class="active${activeSelected}" href="#/active">해야할 일</a>
    </li>
    <li>
      <a class="completed${completedSelected}" href="#/completed">완료한 일</a>
    </li>`;
};

export const userListTemplate = (users, userName) => {
  return users
    .map((user) => {
      const active = user.name === userName ? "active" : "";
      return `<button class="ripple ${active}">${user.name}</button>`;
    })
    .join("");
};

export const userTitleTemplate = (userName) => {
  return `<span><strong>${userName}</strong>'s Todo List</span>`;
};
