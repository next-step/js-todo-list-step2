export const userButtonDOM = (username, activeUser) => 
    `<button class="ripple ${username == activeUser.name ? 'active' : ''}">
        ${username}
    </button>`;

export const userCreateButtonDOM = () => 
    `<button class="ripple user-create-button">
        + 유저 생성
    </button>`;

export const todoDOM = (todo) => `
    <li id=${todo._id} class=${todo.isCompleted && 'completed'}>
    <div class="view">
    <input class="toggle" type="checkbox" ${todo.isCompleted && 'checked'}/>
    <label class="label">
        ${todo.contents}
    </label>
    <button class="destroy"></button>
    </div>
    <input class="edit" value=${todo.contents} />
    </li>`;
