import { HTTP_REQUEST } from "./util.js";

const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com/api/users';


export const userAPI = {
  async getAllUser(){
    return  await fetch(BASE_URL).then(data => data.json());
  },
  async deleteUser(id){
    return await fetch(`${BASE_URL}/${id}`,HTTP_REQUEST.DELETE());
  },
  async addUser(data){
    return await fetch(`${BASE_URL}`,HTTP_REQUEST.POST(data)).then(data=>data.json());
  },
  async getUser(id){
    return await fetch(`${BASE_URL}/${id}`).then(data => data.json());
  }
}


export const todoAPI = {
  async getTodoItem(id){
    return await fetch(`${BASE_URL}/${id}/items`).then(data => data.json);
  },
  async addTodoItem(id, item){
    return await fetch(`${BASE_URL}/${id}/items`, HTTP_REQUEST.POST(item));
  },
  async deleteAllTodoItem(id){
    return await fetch(`${BASE_URL}/${id}/items`,HTTP_REQUEST.DELETE());
  },
  async deleteTodoItem(userId, itemId){
    return await fetch(`${BASE_URL}/${userId}/ items/${itemId}`,HTTP_REQUEST.DELETE());
  },
  async updateTodoItem(userId, itemId, newItem){
    return await fetch(`${BASE_URL}/${userId}/items/${itemId}`, HTTP_REQUEST.PUT(newItem));
  },
  async updateTodoPriority(userId, itemId, priority){
    return await fetch(`${BASE_URL}/${userId}/items/${itemId}/`, HTTP_REQUEST.PUT(priority));
  },
  async toggleTodoItem(userId, itemId){
    return await fetch(`${BASE_URL}/${userId}/items/${itemId}/toggle`, HTTP_REQUEST.PUT())
  }
}