import {api} from '../api.js';
import {addToUserList} from './loadUser.js';
import {setActive} from './userState.js';

export const onUserCreateHandler = () => {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  
    createUser(userName);
    setActive();
  }
  

const createUser = (userName) => {
    const newUser = {
        _id: createID(),
        name: userName,
        todolist: []
    }

    api.addUser(newUser);
    addToUserList(newUser.name);
}

const createID = () => {
    return Math.random().toString(36).substr(2,16);
}
