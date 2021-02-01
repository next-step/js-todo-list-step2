import {$userList} from '../todoDOM.js';
import {editTitleName} from './todoTitle.js';
import {getUserTodo, userIdList} from './loadUser.js';

export const setActive = async () => {
    const $firstUser = $userList.querySelector('button');
    const firstUserName = $firstUser.innerText;

    addActive($firstUser);
    editTitleName(firstUserName);
}

export const changeActiveUser = ({target}) => {
    if(target.classList.item(1) !== 'user-create-button'){
        const targetUserName= target.innerText;
        //const targetIndex = getIndexOfUser(targetUserName);
        //console.log(targetIndex);
    
        initState();
        addActive(target);
    
        editTitleName(targetUserName);
        //getUserTodo(userIdList[targetIndex]);
        //console.log(userIdList[targetIndex]);
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

/*
const getIndexOfUser = (targetUserName) => {
    const allUsers = $userList.querySelectorAll('.ripple');

    let index = 0;
    for(const user of allUsers){
        if(user.innerText === targetUserName){
            return index;
        }
        index++;
    };
}
*/