export const todoItemTemplate = (item) =>
  `<li data-id="${item._id}" class="todo-item ${item.isCompleted ? "completed" : ""}">
    <div class="view">
      <input class="toggle" type="checkbox" ${item.isCompleted ? "checked" : ""}/>
      <label class="label">${item.contents}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${item.contents}" />
  </li>`;

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
