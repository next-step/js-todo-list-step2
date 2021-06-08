import { METHOD } from "../const/COMMON.js";
import { request } from "./index.js";

const url = '/users';
const getTodosByUserId = async({ userId }) => {
  const { data } = await request({
    url: `${url}/${userId}/items`
  });
  return data;
}

const postTodoByUserId = async({ userId, contents }) => {
  const { data } = await request({
    url: `${url}/${userId}/items`,
    method: METHOD.POST,
    body: {
      contents
    }
  });
  return data;
}

const deleteTodosByUserId = async({ userId }) => {
  const { data } = await request({
    url: `${url}/${userId}/items`,
    method: METHOD.DELETE,
  });

  return data;
}

const deleteTodoByUserIdAndItemId = async({ userId, itemId }) => {
  const { data } = await request({
    url: `${url}/${userId}/items/${itemId}`,
    method: METHOD.DELETE
  });

  return data;
} 

const putTodoByUserIdAndItemId = async({ userId, itemId, contents }) => {
  const { data } = await request({
    url: `${url}/${userId}/items/${itemId}`,
    method: METHOD.PUT,
    body: {
      contents
    }
  });
  return data;
} 

const putTodoPriorityByUserIdAndItemId = async({ userId, itemId, priority }) => {
  const { data } = await request({
    url: `${url}/${userId}/items/${itemId}/priority`,
    method: METHOD.PUT,
    body: {
      priority,
    }
  });

  return data;
}

const putTodoCompleteByUserIdAndItemId = async({ userId, itemId, completed }) => {
  const { data } = await request({
    url: `${url}/${userId}/items/${itemId}/${completed}`,
    method: METHOD.PUT
  });

  return data;
}

export default {
  getTodosByUserId,
  postTodoByUserId,
  deleteTodosByUserId,
  deleteTodoByUserIdAndItemId,
  putTodoByUserIdAndItemId,
  putTodoPriorityByUserIdAndItemId,
  putTodoCompleteByUserIdAndItemId,
}