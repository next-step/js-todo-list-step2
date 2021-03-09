import {API} from '../../api/api.js';
import {getCurrentUser} from '../../utils/localStorage.js'
import {loadTodos} from './loadTodos.js';

export const editPriority = () => {
    const $todoList = document.querySelector('.todo-list');

    $todoList.addEventListener('change', onEditPriority);
};

const onEditPriority = async ({target}) => {
    if(!target.classList.contains('chip')){
        return;
    }

    const priorityList = {
        0 : 'NONE',
        1 : 'FIRST',
        2 : 'SECOND',
    };
    const userId = getCurrentUser();
    const itemId = target.closest('li').id;
    const priority = target.value;

    await API.editPriority(userId, itemId, priorityList[priority]);

    loadTodos(userId);

};