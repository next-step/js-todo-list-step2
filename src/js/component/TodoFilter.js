import Observer from "../core/observer.js";
import { $, $$ } from "../util/util.js";
import { FILTER } from "../constants/constants.js";
import { todoAPI, userAPI } from "../api/api.js";

export class TodoFilter extends Observer{
    constructor(selectedUserState, filterState){
        super();
        this.selectedUserState = selectedUserState;
        this.filterState = filterState;
        //console.log(this.state);
    }
    templete(){
        const filter = this.filterState.get();
        console.log("template");
        console.log(filter)
        const todo = this.selectedUserState.get().todoList;
        
        const count = this.counTotalTodo(filter, todo);
         //conso
        return `
        <span class="todo-count">총 <strong>${count}</strong> 개</span>
        <ul class="filters">
          <li class="li-filter">
            <a href="#" class="all ${filter =="all"?"selected":""}">전체보기</a>
          </li>
          <li class="li-filter">
            <a href="#active" class="active ${filter =="active"?"selected":""}">해야할 일</a>
          </li>
          <li class="li-filter">
            <a href="#completed" class="completed  ${filter =="completed"?"selected":""}">완료한 일</a>
          </li>
        </ul>
        <button class="clear-completed">모두 삭제</button>
        
        `
    } 
    render(){
        const target = $(".count-container");
        target.innerHTML = this.templete();
        this.mounted();
    }
    mounted(){
        const filterBtn = $$('.li-filter');
        filterBtn.forEach(btn => btn.addEventListener('click',this.onFilterChange.bind(this)));
    
        const deleteAllBtn = $('.clear-completed');
        deleteAllBtn.addEventListener('click', this.onDeleteAllTodo.bind(this));
    }
    update(){
        this.render();
    }
    async onDeleteAllTodo(){
        const selectedId = this.selectedUserState.get()._id;
        const response = await todoAPI.deleteAllTodoItem(selectedId);
        if(response.ok){
            const data = await userAPI.getUser(selectedId);
            this.selectedUserState.set(data);
        }
    }
    onFilterChange(e){  
        const mode= e.target.className.replace('selected','').trim();
        console.log(this.filterState.get());
        this.filterState.set(mode);
    }
    counTotalTodo(filter, todo){
        console.log(todo);
        if(filter ==FILTER.ALL){
            return todo.length;
        }

        if(filter == FILTER.ACTIVE){
            console.log("active")
            return todo.filter(item => !item.isCompleted).length
        }
        if(filter == FILTER.COMPLETED){
            console.log("compolete")
            return todo.filter(item => item.isCompleted).length
        }
        return 110;
    }
}