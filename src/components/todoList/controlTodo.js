import {API} from '../../api/api.js';
import {loadTodos} from './loadTodos.js';
import {getCurrentUser} from '../../utils/localStorage.js';

//delete todo & complete todo
export const initControlTodo = () => {
    const $todoList = document.querySelector('.todo-list');

    $todoList.addEventListener('click', onControlTodo);
}

const onControlTodo = async ({target}) => {

    if (target.className === 'destroy'){
        const userId = getCurrentUser();
        const itemId = target.closest('li').id;
    
        await API.deleteTodo(userId, itemId);
        loadTodos(userId);
    }

    else if(target.className === 'toggle'){
        const userId = getCurrentUser();
        const itemId = target.closest('li').id;

        await API.toggleTodo(userId, itemId);
        loadTodos(userId);
    } 
}
