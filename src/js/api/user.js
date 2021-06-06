import { METHOD } from "../const/COMMON.js";
import { request } from "./index.js";

const url = '/users';

const postUser = async(name) => {
  
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

const getUser = async(id) => {
  const { data } = await request({
    url: `${url}/${id}`,
  });

  return data;
}

const deleteUser = async(id) => {
  const { status } = await request({
    url: `${url}/${id}`,
    method: METHOD.DELETE
  });
  console.log(status);
  return true;
}

export default {
  postUser,
  getUsers,
  getUser,
  deleteUser
}