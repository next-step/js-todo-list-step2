import {API} from '../../api/api.js';
import {loadTodos} from './loadTodos.js';
import {getCurrentUser} from '../../utils/localStorage.js';
export const MIN_TODO_LENGTH = 2;

export const initAddTodo = () => {
    const $newTodo = document.querySelector('.new-todo');
    $newTodo.addEventListener('keyup', onAddTodo); 
}

const onAddTodo = async ({target, key}) => {
    const todoTitle = target.value;
    if(key === 'Enter'){
        if(todoTitle.length < MIN_TODO_LENGTH){
            return alert(`할 일을 ${MIN_TODO_LENGTH}글자 이상 입력해주세요.`);
        }
        const userId = getCurrentUser();
        await API.addTodo(userId, todoTitle);
        loadTodos(userId);
        target.value = '';
    }
}