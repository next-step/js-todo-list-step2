import API from './settings.js';
const baseURL = 'https://js-todo-list-9ca3a.df.r.appspot.com';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));


export const getUserList = async() => {
    try{
        const userList = await API.get(`${baseURL}/api/users`);
        return userList ?? [];
    }catch(err){
        throw Error(err);
    }
}

export const addUser = async(username) => {
    await delay(500)
    try{
        const newUser = {
            "name": username,
        }
        const response = await API.post(`${baseURL}/api/users`, newUser);
        return response;
    }catch(err){
        throw Error(err);
    }
}

export const getUser = async(userId) => {
    try{
        const user = await API.get(`${baseURL}/api/users/${userId}`);
        return user;
    }catch(err){
        throw Error(err);
    }
}

export const deleteUser = async(userId) => {
    try{
        const response = await API.delete(`${baseURL}/api/users/${userId}`);
        return response;
    }catch(err){
        throw Error(err);
    }
}

export const getTodoListByUserId = async(userId) => {
    await delay(500)
    try{
        const todos = await API.get(`${baseURL}/api/users/${userId}/items/`);
        return todos;
    }catch(err){
        throw Error(err);
    }
}

export const addTodo = async(userId, todo) => {
    await delay(500)
    try{
        const newTodo = {
            contents: todo,
        }
        const response = await API.post(`${baseURL}/api/users/${userId}/items/`, newTodo);
        return response;
    }catch(err){
        throw Error(err);
    }
};

export const checkTodo = async(userId, itemId) => {
    await delay(500)
    try{
        const response = await API.put(`${baseURL}/api/users/${userId}/items/${itemId}/toggle`);
        return response;
    }catch(err){
        throw Error(err);
    }
}

export const deleteTodo = async(userId, itemId) => {
    await delay(500)
    try{
        const response = await API.delete(`${baseURL}/api/users/${userId}/items/${itemId}`);
        return response;
    }catch(err){
        throw Error(err);
    }
}

export const deleteAllTodos = async(userId) => {
    await delay(500)
    try{
        const response = await API.delete(`${baseURL}/api/users/${userId}/items/`);
        return response
    }catch(err){
        throw Error(err);
    }
}

export const editTodo = async(userId, itemId, contents) => {
    await delay(500)
    try{
        const newContents ={
            contents,
        }

        const response = await API.put(`${baseURL}/api/users/${userId}/items/${itemId}`, newContents);
        return response;
    }catch(err){
        throw Error(err);
    }
}

export const changeTodoPriority = async(userId, itemId, priority) => {
    await delay(500)
    try{
        const newPriority = {
            priority,
        };
        const response = await API.put(`${baseURL}/api/users/${userId}/items/${itemId}/priority`, newPriority);
        return response;
    }catch(err){
        throw Error(err);
    }
}
