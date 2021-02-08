import {API} from '../../api/api.js';
import {loadTodos} from './loadTodos.js';
import {getCurrentUser} from '../../utils/localStorage.js';
import {MIN_TODO_LENGTH} from './addTodo.js';

export const initEditTodo = () => {
    const $todoList = document.querySelector('.todo-list');

    $todoList.addEventListener('dblclick', onEditTodo);
}

const editTodo = async (target) => {
    const newTitle = target.value;

    if(newTitle.length < MIN_TODO_LENGTH){
        return console.log('할 일을 입력해주세요');
    }
        const userId = getCurrentUser();
        const itemId = target.closest('li').id;

        await API.editTodo(userId,itemId, newTitle);
        loadTodos(userId);
};

const revertTodo = (target, originalTodo) => {
    const $li = target.closest('li');

    target.value = originalTodo;
    $li.classList.remove('editing');
};

const onUpdateTitle = ({target, key}, originalTodo) => {
    const keyList = {
        Enter : editTodo,
        Escape : revertTodo, 
    };

    return keyList[key] && keyList[key](target, originalTodo);
};

const onEditTodo =  async ({target}) => {
    if(target.className === 'label'){
        const originalTodo = target.innerText;
        const $li = target.closest('li');

        $li.classList.add('editing');
        $li.addEventListener('keyup', (event) => onUpdateTitle(event, origin));
    }
};