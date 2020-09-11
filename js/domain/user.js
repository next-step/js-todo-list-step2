import { checkArray, checkString } from "../utils/validator.js";

class User {
    constructor(_id, name, todoList) {
        checkString(_id, name);
        checkArray(todoList)

        this._id = _id;
        this.name = name;
        this.todoList = todoList;
    }

    static of({_id, name, todoList}) {
        return new User(_id, name, todoList)
    }
}

export default User;