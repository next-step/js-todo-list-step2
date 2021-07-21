import { fetchAPI, METHOD } from "./constants";

export const getUserList = () => fetchAPI();

export const getUser = (userid) => fetchAPI(`${userid}`);

export const addUser = (name) => fetchAPI(``, METHOD.POST, { name });

export const deleteUser = (userid) => fetchAPI(`${userid}`, METHOD.DELETE);


