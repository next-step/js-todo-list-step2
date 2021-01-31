import {api} from '../api.js';

export const createUser = (userName) => {
    const newUser = {
        _id: createID(),
        name: userName,
        todolist: []
    }

    api.addUser(newUser);
}

const createID = () => {
    return Math.random().toString(36).substr(2,16);
}
