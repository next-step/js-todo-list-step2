import {$userList} from '../todoDOM.js';
import {editTitleName} from './todoTitle.js';

export const setActive = async () => {
    const $firstUser = $userList.querySelector('button');
    const firstUserName = $firstUser.innerText;

    addActive($firstUser);
    editTitleName(firstUserName);
}

export const changeActiveUser = ({target}) => {
    const targetUserName= target.innerText;

    initState();
    addActive(target);

    if(target.classList.item(1) !== 'user-create-button'){
        editTitleName(targetUserName);
    }

}

const initState = () => {
    const buttons = $userList.querySelectorAll('.ripple');
    buttons.forEach((button) => {
        removeActive(button);
    });
}

const addActive = (element) => {
    element.classList.toggle('active');
}

const removeActive = (element) => {
    element.classList.remove('active');
}