import {API} from '../../api/api.js';
import {loadTodos} from './loadTodos.js';
import {getCurrentUser} from '../../utils/localStorage.js';

//add or delete or edir todo item 
export const initControlTodo = () => {
    const $todoList = document.querySelector('.todo-list');

    $todoList.addEventListener('click', onControlTodo);// delete, complete todo
}

const onControlTodo = async ({target}) => {
    //delete todo
    if (target.className === 'destroy'){
        const userId = getCurrentUser();
        const itemId = target.closest('li').id;
    
        await API.deleteTodo(userId, itemId);
        loadTodos(userId);
    }
    // complete todo
    else if(target.className === 'toggle'){
        const userId = getCurrentUser();
        const itemId = target.closest('li').id;

        await API.toggleTodo(userId, itemId);
        loadTodos(userId);
    } 
}
