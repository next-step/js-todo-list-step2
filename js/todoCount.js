import TodoList from "./todoList.js";
export class TodoCount{
    constructor(){
        this.$todoCount = qs(".count-container");
        this.eventController(this.$todoCount)
    }

    eventController(todoCount){
        todoCount.addEventListener("click", ({target}) => {
            if(target.nodeName == "BUTTON") TodoList.deleteAll()
        })
        qs(".filters",todoCount).addEventListener("click", ({target}) =>{
            if(target.nodeName == "A") console.log(target);
        })
    }
}