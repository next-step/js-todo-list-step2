import { loadUsers } from './loadUsers.js';
import { selectTarget } from '../todoList/filterTodo.js';

export const selectUser = async (target) => {
    const userId = target.dataset.id;

    const allBtn = document.querySelector('.all');
    selectTarget(allBtn);
    loadUsers(userId);
};
