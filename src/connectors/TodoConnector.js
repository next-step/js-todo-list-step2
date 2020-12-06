import HttpConnector from "../core/HttpConnector.js";
import server from "../configs/server.js";

const todoConnector = new HttpConnector({baseUrl: server.URL + "/api/users"});

export default Object.freeze({
    getUsers() {
        return todoConnector.get(``);
    },

    getUser(userId) {
        return todoConnector.get(`/${userId}`);
    },

    addUser(name) {
        return todoConnector.post(``, { name });
    },

    deleteUser(userId) {
        return todoConnector.delete(`/${userId}`);
    },

    getUserTodoItems(userId) {
        return todoConnector.get(`/${userId}/items`);
    },

    addUserTodoItems(userId, contents) {
        return todoConnector.post(`/${userId}/items`, { contents });
    },

    deleteUserTodoItems(userId) {
        return todoConnector.delete(`/${userId}/items`);
    },

    deleteUserTodoItem(userId, itemId) {
        return todoConnector.delete(`/${userId}/items/${itemId}`);
    },

    modifyUserTodoItem(userId, itemId, contents) {
        return todoConnector.put(`/${userId}/items/${itemId}`, { contents });
    },

    setPriorityUserTodoItem(userId, itemId, priority) {
        return todoConnector.put(`/${userId}/items/${itemId}/priority`, { priority });
    },

    toggleUserTodoItem(userId, itemId) {
        return todoConnector.put(`/${userId}/items/${itemId}/toggle`);
    }
});