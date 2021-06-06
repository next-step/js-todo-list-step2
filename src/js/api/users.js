import { METHOD } from "../const/COMMON.js";
import { request } from "./index.js";

const url = '/users';

const postUser = async({ name }) => {
  
  const { data } = await request({
    url,
    method: METHOD.POST,
    body: {
      name,
    }
  });

  return data;
}

const getUsers = async() => {
  
  const { data } = await request({ url });
  
  return data;
}

const getUserByUserId = async({ userId }) => {
  const { data } = await request({
    url: `${url}/${userId}`,
  });

  return data;
}

const deleteUserByUserId = async({ userId }) => {
  const { status } = await request({
    url: `${url}/${userId}`,
    method: METHOD.DELETE
  });
  console.log(status);
  return true;
}

export default {
  postUser,
  getUsers,
  getUserByUserId,
  deleteUserByUserId,
}