import {initSelectUser} from './selectUser.js';
import {initAddUser} from './addUser.js';
import {initDeleteUser} from './deleteUser.js';


export const userList = () => {
    initSelectUser();
    initAddUser();
    initDeleteUser();
};