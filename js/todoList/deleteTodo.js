import { API } from '../api.js';
import { getCurrentUser } from '../localStorage.js';
import { loadTodos } from './loadTodos.js';

const DELETE_MSG = '정말로 삭제하시겠습니까?';

export const deleteTodo = async ({ target }) => {
    if(!target.classList.contains('destroy')) return;

    if(!confirm(DELETE_MSG)) return;

    const $li = target.closest('li');
    const { id } = $li.dataset;

    const userId = getCurrentUser();

    await API.deleteTodo(userId, id);

    loadTodos(userId);
};

export const deleteTodoAll = async () => {
    if(!confirm(DELETE_MSG)) return;

    const userId = getCurrentUser();

    await API.deleteTodoAll(userId);
    
    loadTodos(userId);
};
