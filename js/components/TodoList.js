import { CLASS, EVENT } from "../utils/constant.js";
import { todoDOM } from "../utils/templates.js";
import { checkTarget } from "../utils/validator.js";

function TodoList({ $target, store, onToggleTodo }) {
    this.init = () => {
        checkTarget($target);

        store.subscribe(this.render);
        this.bindEvents();
    };

    this.bindEvents = () => {
        $target.addEventListener(EVENT.CLICK, this.onClick);
    };

    this.onClick = (e) => {
        if (e.target.className === CLASS.TOGGLE) {
            const id = e.target.closest("li").dataset.id;
            const userId = store.getState().user._id;
            onToggleTodo(userId, id);
        }
    };

    this.render = (state) => {
        $target.innerHTML = createTodoListDOM(state.user.todoList);
    };

    const createTodoListDOM = (todos) => {
        return todos.reduce((html, todo) => {
            html += todoDOM(todo);
            return html;
        }, "");
    };

    this.init();
}

export default TodoList;
