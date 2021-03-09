import { userList } from './userList/userListManage.js';
import { loadUsers } from './userList/loadUsers.js';
import { todoTrigger } from './todoList/todoTrigger.js';

export const todoApp = async () => {
    await loadUsers();
    userList();
    todoTrigger();
};

// window.onload = () => {
//     todoApp();
// };

window.addEventListener('DOMContentLoaded', function(){
    todoApp();
});
