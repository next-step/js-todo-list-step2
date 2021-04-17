export const todoTemplate = ({ contents, _id, isCompleted, priority }) => {
  return `
    <li data-_id="${_id}" class="${isCompleted && "completed"} todo-item-li">
        <div class="view">
            <input class="toggle" type="checkbox" data-_id="${_id}" ${isCompleted && "checked"} />
            <label class="label">
              ${todoPriorityTemplate(priority)}
              ${contents}
            </label>
            <button class="destroy" data-_id="${_id}"></button>
        </div>
        <input class="edit" value="${contents}" />
    </li>
    `;
};

export const todoPriorityTemplate = (priority) => {
  if (priority === 'FIRST') return '<span class="chip primary">1순위</span>';
  if (priority === 'SECOND') return '<span class="chip secondary">2순위</span>';
  return `
  <select class="chip select">
    <option value="NONE" selected>순위</option>
    <option value="FIRST">1순위</option>
    <option value="SECOND">2순위</option>
  </select>
  `;
};

export const userTemplate = ({ _id, name, isSelected }) => {
  return `
    <user-list-item key="${_id}" data-_id="${_id}" data-name="${name}">
        <button class="ripple ${isSelected && "active"}" data-_id="${_id}">
        ${name}
        </button>
    </user-list-item>
    `;
};

export const userListActionButtonTemplate = () => {
  return `
  <div class="action-button-wrap">
    <button class="ripple user-create-button" data-action="createUser">
      + 유저 생성
    </button>
    <button class="ripple user-delete-button" data-action="deleteUser">
      삭제 -
    </button>
  </div>
  `;
};
