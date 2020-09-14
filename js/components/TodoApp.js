import { Subject } from "../observer/Subject.js";
import { UserTitle } from "./UserTitle.js";
import { UserList } from "./UserList.js";
import { TodoInput } from "./TodoInput.js";
import { TodoList } from "./TodoList.js";
import { TodoFooter } from "./TodoFooter.js";
import { TodoHttpClient } from "../repository/TodoHttpClient.js";
import { UserService } from "../service/UserService.js";
import { FooterTab } from "../data/constant.js";


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
        this.#todoRepository = new TodoHttpClient();
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
        this.addObservers(
            new UserTitle(_.userTitleTarget, this),
            new UserList(_.userListTarget, this),
            new TodoInput(_.todoInputTarget, this),
            new TodoList(_.todoListTarget, this),
            new TodoFooter(_.todoFooterTarget, this)
        );
        this.notify();
    }

    get repository(){return this.#todoRepository;}
    get service() {return this.#userService;}

};

const todoapp = new TodoApp({
    userTitleTarget: document.getElementById("user-title"),
    userListTarget: document.querySelector("#user-list"),
    todoInputTarget: document.querySelector(".input-container"),
    todoListTarget: document.querySelector(".todo-list"),
    todoFooterTarget: document.querySelector(".count-container")
});
