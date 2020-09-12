import { TodoApp } from "./components/TodoApp.js";
import { TodoRepository } from "./repository/TodoRepository.js";

window.addEventListener('DOMContentLoaded', async (event) => {
    /*const todoApp = new TodoApp();
    todoApp.addObservers(
        new TodoInput(todoApp),
        new TodoList(todoApp),
        new TodoCount(todoApp)
    );
    todoApp.render();*/
    let todoRepository = new TodoRepository();
    let findUsers = await todoRepository.findUsers();
    debugger


});
