import axios from "axios";
import { API } from "@constants/url";

export const getUsers = () => axios(API.GET_USERS);
export const getUser = (_id) => axios(API.GET_USER(_id));
export const createUser = (name) => axios.post(API.CREATE_USER, { name });
export const deleteUser = (_id) => axios.delete(API.DELETE_USER(_id));
export const addTodoItem = ({ _id, contents }) => axios.post(API.ADD_TODO_ITEM(_id), { contents });
export const toggleTodoItem = (_id) => axios.put(API.TOGGLE_TODO_ITEM);
