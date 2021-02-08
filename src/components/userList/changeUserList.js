import {loadUsers} from './loadUsers.js';
import {API} from '../../api/api.js';
import {getCurrentUser} from '../../utils/localStorage.js';
const MIN_USER_NAME = 2;

export const changeUserList = () => {
    const $userList = document.getElementById('user-list');
    $userList.addEventListener("click", onChangeUserList);
}

const onChangeUserList = async ({target}) => {
    if (target.className === 'ripple user-create-button'){
        const userName = prompt('이름을 입력해주세요');
        if(userName === null) return;
        if(userName.length < MIN_USER_NAME){
            return alert(`닉네임은 ${MIN_USER_NAME}자 이상 입력해주세요`);
        }
        await API.addUser(userName);
        loadUsers();
    }
    else if(target.className === 'ripple user-delete-button'){
        const userId = getCurrentUser();

        await API.deleteUser(userId);
        loadUsers();
    }
}