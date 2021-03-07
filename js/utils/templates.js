import { priorityClassConverter, priorityValueConverter } from "/js/utils/priorityConverter.js";

export const loadingBarTemplate = () =>
  `<li>
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

export const todoItemTemplate = (item) => {
  const priorityTemplate = findPriorityTemplate(item.priority);
  return `<li data-id="${item._id}" class="todo-item ${item.isCompleted ? "completed" : ""}">
    <div class="view">
      <input class="toggle" type="checkbox" ${item.isCompleted ? "checked" : ""}/>
      <label class="label">
        ${priorityTemplate}
        ${item.contents}
      </label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${item.contents}" />
  </li>`;
}

const findPriorityTemplate = (priority) => {
  if (priority === "NONE") {
    return prioritySelectTemplate();
  }
  return selectedPriorityTemplate(priority);
};

export const prioritySelectTemplate = () =>
  `<select class="chip select">
    <option value="0" selected>순위</option>
    <option value="1">1순위</option>
    <option value="2">2순위</option>
  </select>`

export const selectedPriorityTemplate = (priority) =>
  `<span class="chip ${priorityClassConverter(priority)}">${priorityValueConverter(priority)}순위</span>`

export const todoFilterTemplate = (data) =>
  `<span class="todo-count">총 <strong>${data.count}</strong> 개</span>
  <ul id="filters" class="filters">
    <li>
      <a class="all ${
        data.filter === "all" ? "selected" : ""
      }" href="/#">전체보기</a>
    </li>
    <li>
      <a class="active ${
        data.filter === "active" ? "selected" : ""
      }" href="#active">해야할 일</a>
    </li>
    <li>
      <a class="completed ${
        data.filter === "completed" ? "selected" : ""
      }" href="#completed">완료한 일</a>
    </li>
  </ul>`;

export const todoUserTemplate = (member, nowMember) =>
  `<button data-id="${member._id}" class="ripple ${
    member === nowMember ? "active" : ""
  }">${member.name}</button>`;

export const todoUserCreateDeleteTemplate =
  '<button class="ripple user-create-button">+ 유저 생성</button>' +
  '<button class="ripple user-delete-button">- 현재 유저 삭제</button>';
