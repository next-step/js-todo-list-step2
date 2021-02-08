import {API} from '../../api/api.js';
import {loadTodos} from './loadTodos.js';
import {getCurrentUser} from '../../utils/localStorage.js';

export const initDeleteAllTodos = () => {
    const $deleteAll = document.querySelector('.clear-completed');

    $deleteAll.addEventListener('click', onDeleteAllTodos);//delete all todos
}

const onDeleteAllTodos = async ({target}) => {
    const userId = getCurrentUser();
    await API.deleteAllTodos(userId);

    loadTodos(userId);
}