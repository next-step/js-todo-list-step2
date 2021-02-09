import {loadTodos} from '../todoList/loadTodos.js';
import {getCurrentUser, setCurrentUser} from '../../utils/localStorage.js';

export const initSelectUser = () => {
    const $userList = document.getElementById('user-list');
    $userList.addEventListener("click", onChangeTitleName);
}

export const onChangeTitleName = async ({target}) => {
    const controlButtton = ['ripple user-create-button', 'ripple user-delete-button'];
    if (controlButtton.includes(target.className)) return;

    const preUserId = getCurrentUser();
    const userId = target.id;

    document.getElementById(`${preUserId}`).classList.remove('active');
    document.getElementById(`${userId}`).classList.add('active');

    setCurrentUser(userId);
    await loadTodos(userId);
}