
export function TodoUsers($div, context) {

    const $userList = $div.querySelector('#user-list');

    const onUserClickedEvent = (e) => {
        const className = e.target.classList;
        if(className.contains('user-create-button')){
            const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
            context.registerUser(userName);
        }else{
            context.findTodosByUser(e.target.id);
        }
    }

    $userList.addEventListener('click', onUserClickedEvent);


    this.render = (users) => {
        $userList.innerHTML = users.map(user => renderUsers(user)).join('');
        $userList.insertAdjacentHTML('beforeend', '<button class="ripple user-create-button">+ 유저 생성</button>');
    } 

    const renderUsers = (user) => {
       return `<button id=${user._id} class="${user.active ? 'active ripple' : 'ripple'}">${user.name}</button>`;
    }

}
