import {$userList} from '../todoDOM.js';
import {api} from '../api.js';
import {setActive} from './userState.js';

export const loadUserList = async () => {
    const array = await api.loadUserList();
    console.log(array);
    
    array.map((user) => {
        const name = user.name;
        addToUserList(name);
    })

    setActive();

}

const addToUserList = (name) => {
    $userList.insertAdjacentHTML('afterbegin', userButtonTemplate(name));
}

const userButtonTemplate = (name) => {
    return `<button class="ripple">${name}</button>`
}
