import { TodoHttpClientAdapter } from "./TodoHttpClientAdapter.js";

export const TodoHttpClient = class extends TodoHttpClientAdapter{

    constructor() {
        super();
    }

     findUsers() {
        return this.get("/users");
    }

     saveUser(name) {
        return this.post( "/users", { name });
    }

     findUser(userId) {
        return this.get(`/users/${userId}`);
    }

     deleteUser(userId) {
        return this.delete(`/users/${userId}`);
    }

     findTodoItems(userId) {
        return this.get(`/users/${userId}/items/`);
    }

     saveTodoItem(userId, contents) {
        return this.post(`/users/${userId}/items/`, { contents });
    }

     deleteTodoItemsAll(userId) {
        return this.delete(`/users/${userId}/items/`);
    }

     deleteTodoItem(userId, itemId) {
        return this.delete(`/users/${userId}/items/${itemId}`);
    }

     modifyTodoItem(userId, itemId, contents) {
        return this.put(`/users/${userId}/items/${itemId}`, { contents });
    }

     modifyTodoItemPriority(userId, itemId, priority) {
        return this.put(`/users/${userId}/items/${itemId}/priority`, { priority });
    }

     modifyTodoItemComplete(userId, itemId, isCompleted) {
        return this.put(`/users/${userId}/items/${itemId}/toggle`, { isCompleted });
    }
}
