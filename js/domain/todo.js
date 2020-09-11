import { checkBoolean, checkString } from "../utils/validator.js";

class Todo {
    constructor(_id, contents, priority, isCompleted) {
        checkString(_id, contents, priority);
        checkBoolean(isCompleted)

        this._id = _id;
        this.contents = contents;
        this.priority = priority;
        this.isCompleted = isCompleted;
    }

    static of({_id, contents, priority, isCompleted}) {
        new Todo(_id, contents, priority, isCompleted);
    }
}

export default Todo;