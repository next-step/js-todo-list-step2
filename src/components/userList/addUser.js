import {loadUsers} from './loadUsers.js';
import {API} from '../../api/api.js';
//import {getCurrentUser} from '../../utils/localStorage.js';
const MIN_USER_NAME = 2;

export const initAddUser = () => {
    const $userList = document.getElementById('user-list');
    $userList.addEventListener("click", onAddUser);
}

const onAddUser = async ({target}) => {
    if (!target.classList.contains('user-create-button')) return;

    const userName = prompt('이름을 입력해주세요');
    if(!userName) return;
    if(userName.length < MIN_USER_NAME) return alert(`닉네임은 ${MIN_USER_NAME}자 이상 입력해주세요`);
    await API.addUser(userName);
    loadUsers();
    
}