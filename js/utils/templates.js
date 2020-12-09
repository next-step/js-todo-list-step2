export const userListDOM = (username, activeUser) =>
    `<button class="ripple${username == activeUser.name ? " active" : ""}">
        ${username}
    </button>`;

export const userButtonDOM = () =>
    `<button class="ripple user-create">+ 유저 생성</button>
    <button class="ripple user-remove">- 유저 삭제</button>`;

export const todoDOM = (todo) => `
    <li data-id=${todo._id} ${todo.isCompleted ? "class=completed" : ""}>
    <div class="view">
    <input class="toggle" type="checkbox" ${todo.isCompleted && "checked"}/>
    <label class="label">
        ${todo.contents}
    </label>
    <button class="destroy"></button>
    </div>
    <input class="edit" value=${todo.contents} />
    </li>`;
