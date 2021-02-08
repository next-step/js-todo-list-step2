import {API} from '../../api/api.js';
import {loadTodos} from './loadTodos.js';
import {getCurrentUser} from '../../utils/localStorage.js';

//add or delete or edir todo item 
export const initAddTodo = () => {
    const $newTodo = document.querySelector('.new-todo');
    $newTodo.addEventListener('keyup', onAddTodo); // add todo
}

const onAddTodo = async ({target, key}) => {
    const todoTitle = target.value;
    if(key === 'Enter' && todoTitle !== ''){
        const userId = getCurrentUser();

        await API.addTodo(userId, todoTitle);
        await loadTodos(userId);
        target.value = '';
    }
}