import { API } from '../api.js';
import { getCurrentUser } from '../localStorage.js';
import { loadTodos } from './loadTodos.js';

export const checkTodo = async ({ target }) => {
    if(!target.classList.contains('toggle')) return;
    // console.log('hello!');
    
    const userId = getCurrentUser();
    const itemId = target.closest('li').dataset.id;
    
    await API.checkTodo(userId, itemId);

    loadTodos(userId);
};