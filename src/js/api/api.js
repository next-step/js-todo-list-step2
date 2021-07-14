import { HTTP_REQUEST } from "./util";

const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com/api/users';


export const userAPI = {
  getAllUser(){
    return fetch(BASE_URL).then(data => data.json());
  },
  deleteUser(id){
    return fetch(`${BASE_URL}/${id}`,HTTP_REQUEST.DELETE);
  },
  addUser(data){
    return fetch(`${BASE_URL}`,HTTP_REQUEST.POST(data));
  },
  getUser(id){
    return fetch(`${BASE_URL}/${id}`).then(data =>{data.json()});
  }
}


export const todoAPI = {
  getTodoItem(id){
    return fetch(`${BASE_URL}/${id}/items/`).then(data => data.json);
  },
  addTodoItem(id, item){
    return fetch(`${BASE_URL}/${id}/items/`, HTTP_REQUEST.POST(item));
  },
  deleteAllTodoItem(id){
    return fetch(`${BASE_URL}/${id}/ items/`,HTTP_REQUEST.DELETE);
  },
  deleteTodoItem(userId, itemId){
    return fetch(`${BASE_URL}/${userId}/ items/${itemId}`,HTTP_REQUEST.DELETE);
  },
  updateTodoItem(userId, itemId, newItem){
    return fetch(`${BASE_URL}/${userId}/items/${itemId}`, HTTP_REQUEST.PUT(newItem));
  },
  updateTodoPriority(userId, itemId, priority){
    return fetch(`${BASE_URL}/${userId}/items/${itemId}/`, HTTP_REQUEST.PUT(priority));
  },
  toggleTodoItem(userId, itemId){
    return fetch(`${BASE_URL}/${userId}/items/${itemId}`, HTTP_REQUEST.PUT)
  }
}