import TodoState from "./TodoState.js"
import TodoList from "./todoList.js"
import { fetcher } from "./fetcher.js"
import fetchParams from "./fetchParams.js";
export default new class TodoInput{
    constructor(){
        this.$todoInput = document.querySelector(".new-todo");
        this.eventController(this.$todoInput);
    }

    add(target){
        fetcher(fetchParams.addItem(TodoState.user._id,target.value),this.loadUserItem)
        target.value = '';
    }
    loadUserItem(){
        fetcher(fetchParams.userItem(TodoState.user._id),TodoList.makeList);
    }

    eventController(todoInput){
        todoInput.addEventListener("keydown", ({target, key}) => {
            if(key === "Enter" && !!target.value.trim()) this.add(target);
        });
    }
}
