import { Subject } from "../observer/Subject.js";
import { UserTitle } from "./UserTitle.js";
import { UserList } from "./UserList.js";
import { TodoInput } from "./TodoInput.js";
import { TodoList } from "./TodoList.js";
import { TodoFooter } from "./TodoFooter.js";
import { TodoRepository } from "../repository/TodoRepository.js";
import { UserService } from "../service/UserService.js";
import constant from "../data/constant.js";


export const TodoApp = class extends Subject {
    #todoRepository;
    #userService;

    constructor({
                    userTitleTarget,
                    userListTarget,
                    todoInputTarget,
                    todoListTarget,
                    todoFooterTarget,
                }) {
        super();
        this.#todoRepository = new TodoRepository();
        this.#userService = new UserService(this.#todoRepository, this);
        this.init({
            userTitleTarget,
            userListTarget,
            todoInputTarget,
            todoListTarget,
            todoFooterTarget,
        });

    }
    init = async (_) => {
        await this.#userService.setup();
        let userTitle = new UserTitle(_.userTitleTarget, this);
        let userList = new UserList(_.userListTarget, this);
        let todoInput = new TodoInput(_.todoInputTarget, this);
        let todoList = new TodoList(_.todoListTarget, this);
        let todoFooter = new TodoFooter(_.todoFooterTarget, this);

        this.addObservers(
            userTitle,
            userList,
            todoInput,
            todoList,
            todoFooter
        );
        this.notify();
    }

    getRepository = () => {
        return this.#todoRepository;
    }

    getService = () =>{
        return this.#userService;
    }

};

const todoapp = new TodoApp({
    userTitleTarget: document.getElementById("user-title"),
    userListTarget: document.querySelector("#user-list"),
    todoInputTarget: document.querySelector(".input-container"),
    todoListTarget: document.querySelector(".todo-list"),
    todoFooterTarget: document.getElementById(".count-container")
});
