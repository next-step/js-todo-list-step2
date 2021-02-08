import {initSelectUser} from './selectUser.js';
import {initChangeUserList} from './changeUserList.js';

export const userList = () => {
    initSelectUser();
    initChangeUserList();
};