import { checkArray, checkString } from "../utils/validator.js";
import Todo from "./todo.js";

class User {
    constructor(_id, name, todoList) {
        checkString(_id, name);
        checkArray(todoList)

        this._id = _id;
        this.name = name;
        this.todoList = todoList;
    }

    static of({_id, name, todoList}) {
        const newList = todoList.map(todo => Todo.of(todo))
        return new User(_id, name, newList)
    }

    static init() {
        return new User("", "", [])
    }

    static name(username) {
        return new User("", username, [])
    }
}

export default User;