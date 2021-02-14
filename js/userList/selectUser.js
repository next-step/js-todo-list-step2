import { loadUsers } from './loadUsers.js';
// import { loadTodos } from '../todoList/loadTodos.js';

export const selectUser = async (target) => {
    const userId = target.dataset.id;

    loadUsers(userId);
};