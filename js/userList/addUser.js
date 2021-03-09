import { loadUsers } from './loadUsers.js';
import { API } from '../api.js';

const MIN_USERNAME_LEN = 2;

export const addUser = async () => {
    const userName = prompt('추가하고 싶은 이름을 입력해주세요.');

    if(!userName || !userName.trim()) return;
    if(userName.length < MIN_USERNAME_LEN){
        alert(`이름을 최소 ${MIN_USERNAME_LEN}글자 이상 입력해주세요.`);
        return;
    }

    await API.addUser(userName);
    loadUsers();
};
