import { addUser } from './addUser.js';
import { deleteUser } from './deleteUser.js';
import { selectUser } from './selectUser.js';

const onClickUserList = ({ target }) => {
    if(!target.classList.contains('ripple')) return;
    // console.dir(target);
    if(target.classList.contains('user-create-button')){
        addUser();
    }
    else if(target.classList.contains('user-delete-button')){
        deleteUser();
    }
    else{
        selectUser(target);
    }
};

export const userList = () => {
    const $userList = document.querySelector('#user-list');
    $userList.addEventListener('click', onClickUserList);
};