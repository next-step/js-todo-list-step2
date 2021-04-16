export const todoTemplate = ({ contents, _id, isCompleted, isEditing }) => {
  return `
    <li id=${_id} class='${isCompleted && "completed"} ${isEditing ? "editing" : ""}'>
        <div class="view">
            <input class="toggle" type="checkbox" id=${_id} ${isCompleted && "checked"} />
            <label class="label">${contents}</label>
            <button class="destroy" id=${_id}></button>
        </div>
        <input class="edit" value="${contents}" />
    </li>
    `;
};

export const userTemplate = ({ _id, name }) => {
  return `
    <user-list-item key="${_id}" data-_id="${_id}" data-name="${name}">
        <button class="ripple" data-_id="${_id}">
        ${name}
        </button>
    </user-list-item>
    `;
};
