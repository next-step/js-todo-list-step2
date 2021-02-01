import { 
    requestPostFormData, 
    requestGet, 
    requestPostJSON, 
    requestPut, 
    requestDelete,
    requestPutBody } 
from '../api/index.js'

const API_URL = 'api/users'

const state = {};

async function saveUser(userName) {
    if (userName === null || userName.length < 2) {
        throw alert('유저 이름은 2글자 이상이어야합니다.');
    }
    const savedUser = await requestPostFormData(API_URL, { 'name': userName });
    return savedUser;   
}

async function findAllUsers() {
    const users = await requestGet(API_URL);
    return users;
}

async function findTodoItemsByUser(userId){
    if (userId === null || userId === ''){
        throw alert('유저가 선택되지 않았어요');
    }
    const todoItems = await requestGet(`${API_URL}/${userId}/items`);
    return todoItems;
}

async function saveItem(userId, todoItem){
    if(todoItem === '' || todoItem === null){
        throw alert('빈값을 넣을 순 없습니다.');
    }
    const savedTodoItem = await requestPostJSON(`${API_URL}/${userId}/items`, {'contents' : todoItem });
    return savedTodoItem;
}

async function completeTodoItem(userId, todoItemId) {
    await requestPut(`${API_URL}/${userId}/items/${todoItemId}/toggle`);
    const todoItems = await findTodoItemsByUser(userId);
    return todoItems;
}

async function deleteItem(userId, todoItemId) {
    await requestDelete(`${API_URL}/${userId}/items/${todoItemId}`)
    const todoItems = await findTodoItemsByUser(userId);
    return todoItems;
}

async function deleteAll(userId) {
    await requestDelete(`${API_URL}/${userId}/items`)
    const todoItems = await findTodoItemsByUser(userId);
    return todoItems;
}

async function updateContents(userId, updateItem) {
     const result = await requestPutBody(`${API_URL}/${userId}/items/${updateItem.todoItemId}`, {contents: updateItem.content});
     return result;
}

export const userService = {
    saveUser,
    findAllUsers,
    findTodoItemsByUser,
    saveItem,
    completeTodoItem,
    deleteItem,
    deleteAll,
    updateContents
};
