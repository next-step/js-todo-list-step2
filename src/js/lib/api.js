import axios from "axios";
import { API } from "@constants/url";

const getUsers = () => axios(API.GET_USERS);
const getUser = (userId) => axios(API.GET_USER(userId));
const createUser = (name) => axios.post(API.CREATE_USER, { name });
const deleteUser = (userId) => axios.delete(API.DELETE_USER(userId));
const addTodoItem = ({ userId, contents }) => axios.post(API.ADD_TODO_ITEM(userId), { contents });
const toggleTodoItem = ({ userId, todoId }) => axios.put(API.TOGGLE_TODO_ITEM({ userId, todoId }));
const deleteTodoItem = ({ userId, todoId }) => axios.delete(API.DELETE_TODO_ITEM({ userId, todoId }));
const allDeleteTodoItem = ({ userId }) => axios.delete(API.ALL_DELETE_TODO_ITEM({ userId }));
const modifyTodoItem = ({ userId, todoId, contents }) => axios.put(API.MODIFY_TODO_ITEM({ userId, todoId }), { contents });
const priorityTodoItem = ({ userId, todoId, priority }) => axios.put(API.PRIORITY_TODO_ITEM({ userId, todoId }), { priority });

export {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    addTodoItem,
    toggleTodoItem,
    deleteTodoItem,
    allDeleteTodoItem,
    modifyTodoItem,
    priorityTodoItem,
}
