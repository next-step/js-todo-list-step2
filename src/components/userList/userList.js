import {selectUser} from './selectUser.js';
import {changeUserList} from './changeUserList.js';

export const userList = () => {
    selectUser();
    changeUserList();
};