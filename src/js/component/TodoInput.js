//import Observer from "../core/observer.js";
import { $ } from "../util/util.js";
import { userAPI, todoAPI } from "../api/api.js";


export class TodoInput {
    constructor(selectedUserState){
        //super();
        this.selectedUserState = selectedUserState;
        //console.log( selectedUserState);
        this.addEvent();
    }
    addEvent(){
        const target = $(".new-todo");
        console.log(target);
        target.addEventListener('keyup', this.onAddTodo.bind(this));
    }
    async onAddTodo(e){
        if(e.key==='Enter'){
            const value = e.target.value;
            const id = this.selectedUserState.get()._id;
            await todoAPI.addTodoItem(id, {"contents":value});
            const data = await userAPI.getUser(id);
            console.log(data);
            this.selectedUserState.set(data);
            e.target.value = "";
        }   
    }
    
}