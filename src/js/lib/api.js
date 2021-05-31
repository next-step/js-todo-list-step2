import axios from "axios";
import { API } from "@constants/url";

const METHOD = {
    GET: "get",
    POST: "post",
    DELETE: "delete",
    PUT: "put",
};

const request = async (url, method = METHOD.GET, params = {}) => {
    try {
        return await axios[method](url, params);
    } catch (e) {
        alert(e);
    }
};

const getUsers = () => request(API.GET_USERS);
const getUser = (userId) => request(API.GET_USER(userId));
const createUser = (name) => request(API.CREATE_USER, METHOD.POST, { name });
const deleteUser = (userId) => request(API.DELETE_USER(userId), METHOD.DELETE);
const addTodoItem = ({ userId, contents }) => request(API.ADD_TODO_ITEM(userId), METHOD.POST, { contents });
const toggleTodoItem = ({ userId, todoId }) => request(API.TOGGLE_TODO_ITEM({ userId, todoId }), METHOD.PUT);
const deleteTodoItem = ({ userId, todoId }) => request(API.DELETE_TODO_ITEM({ userId, todoId }), METHOD.DELETE);
const allDeleteTodoItem = ({ userId }) => request(API.ALL_DELETE_TODO_ITEM({ userId }), METHOD.DELETE);
const modifyTodoItem = ({ userId, todoId, contents }) => request(API.MODIFY_TODO_ITEM({ userId, todoId }), METHOD.PUT, { contents });
const priorityTodoItem = ({ userId, todoId, priority }) => request(API.PRIORITY_TODO_ITEM({ userId, todoId }), METHOD.PUT, { priority });

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
