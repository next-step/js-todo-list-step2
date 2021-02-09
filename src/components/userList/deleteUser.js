import {loadUsers} from './loadUsers.js';
import {API} from '../../api/api.js';
import {getCurrentUser} from '../../utils/localStorage.js';

export const initDeleteUser = () => {
    const $userList = document.getElementById('user-list');
    $userList.addEventListener("click", onDeleteUser);
}

const onDeleteUser = async ({target}) => {
    if(!target.classList.contains('user-delete-button')) return;
    const userId = getCurrentUser();

    await API.deleteUser(userId);
    loadUsers();
    
}