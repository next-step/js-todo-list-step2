export const todoTemplate = ({ contents, _id, isCompleted }) => {
  return `
    <li data-_id="${_id}" class="${isCompleted && "completed"} todo-item-li">
        <div class="view">
            <input class="toggle" type="checkbox" data-_id="${_id}" ${isCompleted && "checked"} />
            <label class="label">${contents}</label>
            <button class="destroy" data-_id="${_id}"></button>
        </div>
        <input class="edit" value="${contents}" />
    </li>
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
