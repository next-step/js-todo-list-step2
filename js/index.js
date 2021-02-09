import { userList } from './userList/userListManage.js';
import { loadUsers } from './userList/loadUsers.js';

export const todoApp = async () => {
    await loadUsers();
    userList();
};

window.onload = () => {
    todoApp();
};