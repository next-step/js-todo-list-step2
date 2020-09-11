import { checkBoolean, checkString } from "../utils/validator.js";

class Todo {
    constructor(_id, contents, priority, isCompleted) {
        // TODO : spec의 contents는 string 타입이지만 실제로는 객체를 받는 것도 있다.
        // TODO : spec의 priority는 string 타입이지만 실제로는 숫자를 받는 것도 있다.
        checkString(_id);
        checkBoolean(isCompleted);

        this._id = _id;
        this.contents = contents;
        this.priority = priority;
        this.isCompleted = isCompleted;
    }

    static of({ _id, contents, priority, isCompleted }) {
        new Todo(_id, contents, priority, isCompleted);
    }
}

export default Todo;
