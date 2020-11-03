import { CLASS, EVENT } from "../utils/constant.js";
import { todoDOM } from "../utils/templates.js";
import { checkTarget } from "../utils/validator.js";

function TodoList({ $target, store, onToggleTodo, onRemoveTodo, onChangeTodo }) {
    this.init = () => {
        checkTarget($target);

        store.subscribe(this.render);
        this.bindEvents();
    };

    this.bindEvents = () => {
        $target.addEventListener(EVENT.CLICK, this.onClick);
        $target.addEventListener(EVENT.DOUBLE_CLICK, this.onDoubleClick);
        $target.addEventListener(EVENT.CHANGE, this.onChange);
    };

    this.onClick = (e) => {
        if (e.target.className === CLASS.TOGGLE) {
            const todoId = getTodoId(e);
            const userId = getUserId();
            onToggleTodo(userId, todoId);
        }

        if (e.target.className === CLASS.DESTROY) {
            const todoId = getTodoId(e);
            const userId = getUserId();
            onRemoveTodo(userId, todoId);
        }
    };

    this.onDoubleClick = (e) => {
        if (e.target.className === CLASS.LABEL) {
            const $todo = e.target.closest("li");
            $todo.classList.add(CLASS.EDITING);
        }
    };

    this.onChange = (e) => {
        if (e.target.className === CLASS.EDIT) {
            const contents = e.target.value;
            const userId = getUserId();
            const todoId = getTodoId(e);
            onChangeTodo(userId, todoId, contents);
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

    const getTodoId = (e) => {
        return e.target.closest("li").dataset.id;
    };

    const getUserId = () => {
        return store.getState().user._id;
    };

    this.init();
}

export default TodoList;
