import { API } from '../api.js';
import { getCurrentUser } from '../localStorage.js';
import { loadTodos } from './loadTodos.js';

export const addTodo = async ({ target, key }) => {
    const contents = target.value;

    if(key !== "Enter" || !contents.trim()) return;

    const userId = getCurrentUser();
    await API.addTodo(userId, contents);

    target.value = '';
    loadTodos(userId);
};
