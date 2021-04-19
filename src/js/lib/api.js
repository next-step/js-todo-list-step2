import axios from "axios";
import { API } from "@constants/url";

const request = async (url, method = 'get', params = {}) => {
    try {
        return await axios[method](url, params);
    } catch (e) {
        alert(e);
    }
};

const getUsers = () => request(API.GET_USERS);
const getUser = (userId) => request(API.GET_USER(userId));
const createUser = (name) => request(API.CREATE_USER, 'post', { name });
const deleteUser = (userId) => request(API.DELETE_USER(userId), 'delete');
const addTodoItem = ({ userId, contents }) => request(API.ADD_TODO_ITEM(userId), 'post', { contents });
const toggleTodoItem = ({ userId, todoId }) => request(API.TOGGLE_TODO_ITEM({ userId, todoId }), 'put');
const deleteTodoItem = ({ userId, todoId }) => request(API.DELETE_TODO_ITEM({ userId, todoId }), 'delete');
const allDeleteTodoItem = ({ userId }) => request(API.ALL_DELETE_TODO_ITEM({ userId }), 'delete');
const modifyTodoItem = ({ userId, todoId, contents }) => request(API.MODIFY_TODO_ITEM({ userId, todoId }), 'put', { contents });
const priorityTodoItem = ({ userId, todoId, priority }) => request(API.PRIORITY_TODO_ITEM({ userId, todoId }), 'put', { priority });

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
