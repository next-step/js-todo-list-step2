import { loadUsers } from './loadUsers.js';

export const selectUser = (target) => {
    const userId = target.dataset.id;
    loadUsers(userId);
};