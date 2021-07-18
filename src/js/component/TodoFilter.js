import Observer from "../core/observer.js";
import { $, $$ } from "../util/util.js";
import { FILTER } from "../constants/constants.js";

export class TodoFilter extends Observer{
    constructor(selectedUserState, filterState){
        super();
        this.selectedUserState = selectedUserState;
        this.filterState = filterState;
        //console.log(this.state);
    }
    templete(){
        const filter = this.filterState.get();
        const todo = this.selectedUserState.get().todoList;
        
        const count = this.counTotalTodo(filter, todo);
         //conso
        return `
        <span class="todo-count">총 <strong>${count}</strong> 개</span>
        <ul class="filters">
          <li>
            <a href="#" class="all ${filter =="all"?"selected":""}">전체보기</a>
          </li>
          <li>
            <a href="#active" class="active ${filter =="active"?"selected":""}">해야할 일</a>
          </li>
          <li>
            <a href="#completed" class="completed  ${filter =="completed"?"selected":""}">완료한 일</a>
          </li>
        </ul>
        <button class="clear-completed">모두 삭제</button>
        
        `
    }
    render(){
        const target = $(".count-container");
        target.innerHTML = this.templete();
    }
    update(){
        this.render();
    }
    counTotalTodo(filter, todo){
        console.log(todo);
        if(filter ==FILTER.ALL){
            return todo.length;
        }

        if(filter == FILTER.ACTIVE){
            return todo.filter(item => !item.isCompleted).length
        }
        if(filter == FILTER.COMPLETED){
            return todo.filter(item => item.isCompleted).length
        }
        return 110;
    }
}