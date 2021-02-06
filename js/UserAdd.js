import { addUser } from './httpRequest.js';

const $userCreateBtn = document.querySelector('.user-create-button');

const onUserCreateHandler = () => {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");

    if(!userName || !userName.trim()){
        return;
    }

    addUser(userName);
}

$userCreateBtn.addEventListener('click', onUserCreateHandler);

  