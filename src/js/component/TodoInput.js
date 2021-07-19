//import Observer from "../core/observer.js";
import { $ } from "../util/util.js";
import { userAPI, todoAPI } from "../api/api.js";


export class TodoInput {
    constructor(selectedUserState){
        this.selectedUserState = selectedUserState;
        this.addEvent();
    }
    addEvent(){
        const target = $(".new-todo");
        target.addEventListener('keyup', this.onAddTodo.bind(this));
    }
    async onAddTodo(e){
        if(e.key==='Enter'){
            const value = e.target.value;
            const id = this.selectedUserState.get()._id;
            if(value.length <2 ){
                alert("콘텐츠의 길이는 최소 2글자이상이어야 합니다.");
                return;
            }
            await todoAPI.addTodoItem(id, {"contents":value});
            const data = await userAPI.getUser(id);
            this.selectedUserState.set(data);
            e.target.value = "";
        }   
    }
    
}