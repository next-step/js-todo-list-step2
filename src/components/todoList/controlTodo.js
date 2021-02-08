import {API} from '../../api/api.js';
import {loadTodos, todoListTemplate} from './loadTodos.js';
import {getCurrentUser} from '../../utils/localStorage.js';

//add or delete or edir todo item 
export const changeTodoList = () => {
    const $newTodo = document.querySelector('.new-todo');
    const $todoList = document.querySelector('.todo-list');
    const $deleteAll = document.querySelector('.clear-completed');

    $newTodo.addEventListener('keyup', onAddTodo); // add todo
    $todoList.addEventListener('click', onControlTodo);// delete, complete todo
    $deleteAll.addEventListener('click', onDeleteAllTodos);//delete all todos
    $todoList.addEventListener('dblclick', onEditTodo);//edit todo
}


const editTodo = async (target) => {
    const newTitle = target.value;

    if(newTitle < 1){
        console.log('할 일을 입력해주세요');
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

const onAddTodo = async ({target, key}) => {
    const todoTitle = target.value;
    if(key === 'Enter' && todoTitle !== ''){
        const $todoList = document.querySelector('.todo-list');
        const inputList = todoListTemplate(todoTitle);
        const userId = getCurrentUser();

        await API.addTodo(userId, todoTitle);
        await loadTodos(userId);
        target.value = '';
    }
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

const onDeleteAllTodos = async ({target}) => {
    const userId = getCurrentUser();
    await API.deleteAllTodos(userId);

    loadTodos(userId);
}