import { addUser, fetchUser, fetchUsers } from "../api/userApi.js";
import { SELECTOR } from "../utils/constant.js";
import { checkTarget } from "../utils/validator.js";
import TodoList from "./TodoList.js";
import UserList from "./UserList.js";
import TodoInput from "./TodoInput.js";
import { addTodo, removeTodo, toggleTodo } from "../api/todoApi.js";
import { ADD_TODO, ADD_USER, LOAD_USER, REMOVE_TODO, TOGGLE_TODO } from "../store/Store.js";

function App({ $target, store }) {
    const init = async () => {
        checkTarget($target);

        this.userList = new UserList({
            $target: document.querySelector(SELECTOR.USER_LIST),
            onChangeUser: this.onChangeUser,
            onAddUser: this.onAddUser,
            store,
        });

        this.todoList = new TodoList({
            $target: document.querySelector(SELECTOR.TODO_LIST),
            onToggleTodo: this.onToggleTodo,
            onRemoveTodo: this.onRemoveTodo,
            store,
        });

        this.todoInput = new TodoInput({
            $target: document.querySelector(SELECTOR.TODO_INPUT),
            onAddTodo: this.onAddTodo,
            store,
        });
    };

    this.onChangeUser = async (username) => {
        store.dispatch({
            type: LOAD_USER,
            payload: await fetchUser(username),
        });
    };

    this.onAddUser = async (username) => {
        store.dispatch({
            type: ADD_USER,
            payload: await addUser(username),
        });
    };

    this.onAddTodo = async (title, name) => {
        store.dispatch({
            type: ADD_TODO,
            payload: await addTodo(title, name),
        });
    };

    this.onToggleTodo = async (userId, itemId) => {
        store.dispatch({
            type: TOGGLE_TODO,
            payload: await toggleTodo(userId, itemId),
        });
    };

    this.onRemoveTodo = async (userId, itemId) => {
        store.dispatch({
            type: REMOVE_TODO,
            payload: await removeTodo(userId, itemId),
        });
    };

    init();
}

export default App;
