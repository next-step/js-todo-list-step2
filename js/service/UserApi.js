import {request, options} from "./core.js";

const API_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com';

export const userApi = {
    getUserList: () => {
        return request(`${API_URL}/api/users/`);
    },
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
    getUser: (userId) => {
        return request(`${API_URL}/api/users/${userId}/`);
    },
    deleteUser: (userId) => {
        const apiOption = {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'DELETE',

        };
        return request(`${API_URL}/api/users/${userId}/`, apiOption);
    },
    getUserTodoItem: (userId) => {
        return request(`${API_URL}/api/users/${userId}/items/`);
    },
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
        return request(`${API_URL}/api/users/${userId}/items/`, options.POST(contents));
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
        return request(`${API_URL}/api/users/${userId}/items/${todoItemId}`, options.DELETE());
    },
    putUserTodoItem: (userId, todoItemId , contents) => {
        const apiOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: contents,
            }),
        }
        return request(`${API_URL}/api/users/${userId}/items/${todoItemId}`, options.PUT());
    },
    putUserTodoItemPriority: (userId, todoItemId, priority) => {
        const apiOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                priority: priority,
            }),
        }
        return request(`${API_URL}/api/users/${userId}/items/${todoItemId}/priority`, options.PUT(priority));
    },
    putUserTodoItemCompleteToggle: (userId, todoItemId) => {
        return request(`${API_URL}/api/users/${userId}/items/${todoItemId}/toggle`, options.PUT());
    }
}