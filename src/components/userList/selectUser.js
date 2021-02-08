import {loadTodos} from '../todoList/loadTodos.js';
import {getCurrentUser, setCurrentUser} from '../../utils/localStorage.js';

export const initSelectUser = () => {
    const $userList = document.getElementById('user-list');
    $userList.addEventListener("click", onChangeTitleName);
}

export const onChangeTitleName = async ({target}) => {
    if (!target.classList.contains('ripple') 
        || target.classList.contains('user-create-button') 
        || target.classList.contains('user-delete-button')) {
        return;
    }

    const preUserId = getCurrentUser();
    document.getElementById(`${preUserId}`).className = 'ripple';

    const userId = target.id;
    const $selectedUserButton = document.getElementById(`${userId}`);

    $selectedUserButton.classList.add('active');

    setCurrentUser(userId);
    await loadTodos(userId);
}