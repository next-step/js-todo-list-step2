import {request} from "./core.js";

const API_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com';

export const userApi = {
    getUserList: () => request(`${API_URL}/api/users/`)
    ,
    postUser: (name) => {
        const apiOption = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
            }),
        }
        return request(`${API_URL}/api/users/`, apiOption);
    },
    getUser: (userId) => (`${API_URL}/api/users/${userId}/`)
    ,
    deleteUser: (userId) => {
        const apiOption = {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'DELETE',

        };
        return request(`${API_URL}/api/users/${userId}/`, apiOption);
    },
    getUserTodoItem: (userId) => request(`${API_URL}/api/users/${userId}/items/`)
    ,
    postUserTodoItem: (userId, contents) => {
        const apiOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: contents,
            }),
        }
        return request(`${API_URL}/api/users/${userId}/items/`, apiOptions);
    },
    deleteUserAllTodoItem: (userId) => {
        const apiOption = {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'DELETE',

        };
        return request(`${API_URL}/api/users/${userId}/items/`, apiOption);
    },
    deleteUserOneTodoItem: (userId, todoItemId) => {
        const apiOption = {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'DELETE',

        };
        return request(`${API_URL}/api/users/${userId}/items/${todoItemId}`, apiOption);
    },
    putUserTodoItem: (userId, todoItemId, contents) => {
        const apiOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: contents,
            }),
        }
        return request(`${API_URL}/api/users/${userId}/items/${todoItemId}`, apiOptions);
    },
    putUserTodoItemPriority: (userId, todoItemId, priority) => {
        const apiOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                priority: priority,
            }),
        }
        return request(`${API_URL}/api/users/${userId}/items/${todoItemId}/priority`, apiOptions);
    },
    putUserTodoItemCompleteToggle: (userId, todoItemId) => {
        const apiOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        return request(`${API_URL}/api/users/${userId}/items/${todoItemId}/toggle`, apiOptions);
    }
}