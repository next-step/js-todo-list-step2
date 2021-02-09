import {API} from '../../api/api.js';
import {loadTodos} from './loadTodos.js';
import {getCurrentUser} from '../../utils/localStorage.js';

//delete todo & complete todo
export const initControlTodo = () => {
    const $todoList = document.querySelector('.todo-list');

    $todoList.addEventListener('click', onControlTodo);
}


const onControlTodo = async ({target}) => {

    const classList = ['destroy', 'toggle'];

    if(classList.includes(target.className)){
        const userId = getCurrentUser();
        const itemId = target.closest('li').id;

        target.className === 'destroy' ? await API.deleteTodo(userId, itemId) : await API.toggleTodo(userId, itemId); 

        classList[target.className];
        loadTodos(userId);
    }

}
