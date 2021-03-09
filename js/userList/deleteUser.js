import { API } from '../api.js';
import { loadUsers } from './loadUsers.js';

const DELETE_MSG = '유저를 정말 삭제하시겠습니까?\n(해당 유저에 저장된 Todo List 목록도 함께 삭제됩니다.)';

export const deleteUser = async () => {
    const $selectedUser = document.querySelector('#user-list > .active');
    
    if(!confirm(`'${$selectedUser.textContent}' ` + DELETE_MSG)) return;

    await API.deleteUser($selectedUser.dataset.id);

    loadUsers();
};
