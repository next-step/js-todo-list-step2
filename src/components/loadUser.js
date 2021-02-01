import {$userList} from '../todoDOM.js';
import {api} from '../api.js';
import {setActive} from './userState.js';
import {insertTodo} from './todoInput.js';
import {clearTodo} from './todoEdit.js';

export let userIdList = [];
// 새로고침할때 처음 한번만 작동하는 함수
export const loadUserList = async () => {
    const users = await api.loadUserList();
    console.log(users);
    
    users.map((user) => {
        const name = user.name;
        const userId = user._id;

        addToUserIdList(userId);
        addToUserList(name);
    })

    setActive();
    getUserTodo(users[7]._id);
}

export const addToUserList = (name) => {
    $userList.insertAdjacentHTML('afterbegin', userButtonTemplate(name));
}

const userButtonTemplate = (name) => {
    return `<button class="ripple">${name}</button>`
}

const addToUserIdList = (userId) => {
    userIdList = [...userIdList, userId];
}

export const getUserTodo = async (userId) => {
    
    const array = await api.loadTodoList(userId);
    console.log(array);

    let todos = [];
    for(let i in array){
        const newTodo = array[i].contents;
        todos = [...todos, newTodo];
    }

    //console.log(todos);
    clearTodo();
    todos.forEach(todo => {
        insertTodo(todo);
    });
}
