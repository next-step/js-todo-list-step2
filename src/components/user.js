import {api} from '../api.js';
import {$userList} from '../todoDOM.js';

export const createUser = (userName) => {
    const newUser = {
        _id: createID(),
        name: userName,
        todolist: []
    }

    
    api.addUser(newUser);
    addToList(newUser.name);
    setStateActive();
}

const createID = () => {
    return Math.random().toString(36).substr(2,16);
}

export const loadUserList = async () => {
    const array = await api.loadUserList();
    console.log(array);
    
    array.map((user) => {
        const name = user.name;
        addToList(name);
    })

    setStateActive();

}

const addToList = (name) => {
    $userList.insertAdjacentHTML('afterbegin', userButtonTemplate(name));
}

const userButtonTemplate = (name) => {
    return `<button class="ripple">${name}</button>`
}

export const setStateActive = () => {
    const $firstUser = $userList.querySelector('button');
    const $secondUser = $firstUser.nextSibling;

    $firstUser.classList.toggle('active');
    $secondUser.classList.remove('active');

}