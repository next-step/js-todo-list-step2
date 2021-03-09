import { API } from '../api.js';
import { getCurrentUser } from '../localStorage.js';
import { loadTodos } from './loadTodos.js';

export const checkTodo = async ({ target }) => {
    if(!target.classList.contains('toggle')) return;
    
    const userId = getCurrentUser();
    const itemId = target.closest('li').dataset.id;
    
    await API.checkTodo(userId, itemId);

    loadTodos(userId);
};
