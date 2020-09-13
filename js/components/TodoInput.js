import { checkTarget, checkFunction } from "../utils/validator.js";
import { EVENT, KEY } from "../utils/constant.js";

class TodoInput {
    constructor({ $target, username, onAddTodo }) {
        checkTarget($target);
        checkFunction(onAddTodo);

        this.$target = $target;
        this.name = username;
        this.onAddTodo = onAddTodo;

        this.bindEvents();
    }

    bindEvents = () => {
        this.$target.addEventListener(EVENT.KEY_DOWN, this.onKeyDown);
    };

    onKeyDown = (e) => {
        if (e.key != KEY.ENTER) return;
        if (!this.name) {
            e.target.value = "";
            return;
        }

        const title = e.target.value.trim();

        if (!title) {
            e.target.value = "";
            return;
        }
        this.onAddTodo(title, this.name);
        e.target.value = "";
    };

    setState = (username) => {
        this.name = username;
    };
}

export default TodoInput;
