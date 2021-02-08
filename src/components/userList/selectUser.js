import {loadTodos} from '../todoList/loadTodos.js';
import {getCurrentUser, setCurrentUser} from '../../utils/localStorage.js';

export const selectUser = () => {
    const $userList = document.getElementById('user-list');
    $userList.addEventListener("click", onChangeTitleName);
}

export const onChangeTitleName = async ({target}) => {
    if (!target.classList.contains('ripple') 
        || target.classList.contains('user-create-button') 
        || target.classList.contains('user-delete-button')) {
        return;
    }
    //이전 active 초기화
    const preUserId = getCurrentUser();
    document.getElementById(`${preUserId}`).className = 'ripple';

    //click한 user class active로 변환
    const userId = target.id;
    const $selectedUserButton = document.getElementById(`${userId}`);

    $selectedUserButton.classList.add('active');

    //현재 active한 user local에 저장
    setCurrentUser(userId);
    await loadTodos(userId);
}