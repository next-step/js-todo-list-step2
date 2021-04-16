import axios from "axios";
import { API } from "@constants/url";

export const getUsers = () => axios(API.GET_USERS);
export const getUser = (userId) => axios(API.GET_USER(userId));
export const createUser = (name) => axios.post(API.CREATE_USER, { name });
export const deleteUser = (userId) => axios.delete(API.DELETE_USER(userId));
export const addTodoItem = ({ userId, contents }) => axios.post(API.ADD_TODO_ITEM(userId), { contents });
export const toggleTodoItem = ({ userId, todoId }) => axios.put(API.TOGGLE_TODO_ITEM({ userId, todoId }));
