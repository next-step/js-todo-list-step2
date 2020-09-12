import { BASE_URL } from "../data/constant.js";
import { Repository } from "./Repository.js";

function fetchOption(options = {}) {
    const defaultOptions = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const optEntries = Object.entries(options);

    if (optEntries.length > 0) {
        optEntries.forEach(opt => {
            defaultOptions[opt[0]] = opt[1];
        });
    }

    return defaultOptions;
}

export const TodoRepository = class extends Repository{

    constructor() {
        super(BASE_URL);
    }

     findUsers() {
        return this.fetch("GET", "/users", null, null, null);
    }

     saveUser(name) {
        try {
            return this.fetch("POST", "/users", { name }, null, null);
        } catch (error) {
            console.error(error);
        }
    }

     findUser(userId) {
        return this.fetch("GET", `/users/${userId}`, null, null, null);
    }

     deleteUser(userId) {
        return this.fetch("DELETE", `/users/${userId}`, null, null, null);
    }

     findTodoItems(userId) {
        return this.fetch("GET", `/users/${userId}/items/`, null, null, null);
    }

     saveTodoItem(userId, contents) {
        return this.fetch("POST", `/users/${userId}/items/`, { contents }, null, null);
    }

     deleteTodoItemsAll(userId) {
        return this.fetch("DELETE", `/users/${userId}/items/`, null, null, null);
    }

     deleteTodoItem(userId, itemId) {
        return this.fetch("DELETE", `/users/${userId}/items/${itemId}`, null, null, null);
    }

     modifyTodoItem(userId, itemId, contents) {
        return this.fetch("PUT", `/users/${userId}/items/${itemId}`, { contents }, null, null);
    }

     modifyTodoItemPriority(userId, itemId, priority) {
        return this.fetch("PUT", `/users/${userId}/items/${itemId}/priority`, { priority }, null, null);
    }

     modifyTodoItemComplete(userId, itemId, isCompleted) {
        return this.fetch("PUT", `/users/${userId}/items/${itemId}/toggle`, { isCompleted }, null, null);
    }
}
