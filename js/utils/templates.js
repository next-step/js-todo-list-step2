export const userButtonDOM = (username, activeUser) => 
    `<button class="ripple ${username == activeUser.name ? 'active' : ''}">
        ${username}
    </button>`

export const userCreateButtonDOM = () => 
    `<button class="ripple user-create-button">
        + 유저 생성
    </button>`
