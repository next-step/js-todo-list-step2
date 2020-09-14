import {request , options} from "./core.js";
const API_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com';

export const userApi = {
    getUserList : () => {
        return request(`${API_URL}/api/users/`);
    },
    postUser : (contents) => {
        return request(`${API_URL}/api/users/` ,options.POST(contents) );
    },
    getUser : (userId) =>{
        return request(`${API_URL}/api/users/${userId}/` );
    },
    deleteUser : (userId) => {
        return request(`${API_URL}/api/users/${userId}/` , options.DELETE());
    },
    getUserTodoItem : (userId) =>{
        return request(`${API_URL}/api/users/${userId}/items/`);
    },
    postUserTodoItem : (userId , contents) =>{
        return request(`${API_URL}/api/users/${userId}/items/` , options.POST(contents));
    },
    deleteUserAllTodoItem : (userId ) =>{
        return request(`${API_URL}/api/users/${userId}/items/` , options.DELETE());
    },
    deleteUserOneTodoItem : (userId , todoItem) => {
        return request(`${API_URL}/api/users/${userId}/items/${todoItem}` , options.DELETE());
    },
    putUserTodoItem : (userId, todoItem) => {
        return request(`${API_URL}/api/users/${userId}/items/${todoItem}` , options.PUT());
    },
    putUserTodoItemPriority : (userId , todoItem , priority) => {
        return request(`${API_URL}/api/users/${userId}/items/${todoItem}/priority` , options.PUT_PRIORITY(priority));
    },
    putUserTodoItemCompleteToggle : (userId , todoItem) => {
        return request(`${API_URL}/api/users/${userId}/items/${todoItem}/toggle` , options.PUT_TOGGLE());
    }
}