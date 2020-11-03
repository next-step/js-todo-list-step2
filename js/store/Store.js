class Store {
    constructor() {
        this.state = {
            users: [{ name: "bgpark", todoList: [], _id: "Vy0AtqqvR" }],
            user: {
                name: "bgpark",
                todoList: [
                    {
                        contents: "123",
                        isCompleted: false,
                        priority: "NONE",
                        _id: "BMxbjo85i",
                    },
                    {
                        contents: "123",
                        isCompleted: false,
                        priority: "NONE",
                        _id: "0yHobN7Ac",
                    },
                ],
                _id: "Vy0AtqqvR",
            },
        };
        this.subscribers = [];
    }

    dispatch = (action) => {
        this.state = this.reducer(this.state, action);
        console.log(this.state);
        this.notify();
    };

    subscribe = (func) => {
        this.subscribers.push(func);
    };

    notify = () => {
        this.subscribers.forEach((subscriber) => {
            subscriber(this.state);
        });
    };

    getState = () => {
        return this.state;
    };

    reducer = (state, action) => {
        switch (action.type) {
            case LOAD_USERS:
                return {
                    ...state,
                    users: action.payload,
                };
            case LOAD_USER:
                return {
                    ...state,
                    user: action.payload,
                };
            case ADD_USER:
                return {
                    ...state,
                    users: [...state.users, action.payload],
                };
            case ADD_TODO:
                return {
                    ...state,
                    user: {
                        ...state.user,
                        todoList: [...state.user.todoList, action.payload],
                    },
                };
            case TOGGLE_TODO:
                const newTodoList =
                    state.user.todoList.map((todo) =>
                        todo._id === action.payload._id ? action.payload : todo
                    ) || [];
                return {
                    ...state,
                    user: {
                        ...state.user,
                        todoList: newTodoList,
                    },
                };
            default:
                return state;
        }
    };
}

export const LOAD_USERS = "LOAD_USERS";
export const LOAD_USER = "LOAD_USER";
export const ADD_USER = "ADD_USER";
export const ADD_TODO = "ADD_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";

export default Store;
