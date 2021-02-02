import Common from "./Common.js"
import Render from "./Render.js"
export default class Server {
    uri = null;
    option = null;
    common = null;
    render = null;

    constructor() {
        this.common = new Common();

        this.uri = "https://js-todo-list-9ca3a.df.r.appspot.com";
        this.option = {
            method: '',
            headers: {"Content-Type": "application/json"},
            body: null
        };
    }

    async createUser(userName) {
        this.option.method = "POST";
        this.option.body = JSON.stringify({name: userName});
        return await fetch(`${this.uri}/api/users`, this.option);
    }

    async getTodoItems(userId) {
        this.option.method = "GET";
        this.option.body = null;

        return await fetch(`${this.uri}/api/users/${userId}/items/`, this.option);
    }

    async createTodoItem(userId, value) {
        this.option.method = "POST";
        this.option.body = JSON.stringify({contents: value});

        return await fetch(`${this.uri}/api/users/${userId}/items`, this.option);
    }

    async updateCompleted(userId, itemId) {
        this.option.method = "PUT";
        this.option.body = null;

        return await fetch(`${this.uri}/api/users/${userId}/items/${itemId}/toggle`, this.option);
    }

    async selectItems(userId) {
        this.option.method = "GET";
        this.option.body = null;

        return await fetch(`${this.uri}/api/users/${userId}/`);
    }

    async deleteTodoItem(userId, itemId) {
        this.option.method = "DELETE";
        this.option.body = null;

        return await fetch(`${this.uri}/api/users/${userId}/items/${itemId}`, this.option);
    }

    async updateTodoItem(userId, itemId, contents) {
        this.option.method = "PUT";
        this.option.body = JSON.stringify({contents: contents});

        return await fetch(`${this.uri}/api/users/${userId}/items/${itemId}`, this.option);   
    }
}