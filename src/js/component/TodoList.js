import Observer from "../core/observer.js";
import { PRIORITY } from "../constants/constants.js"
import { $, $$ } from "../util/util.js";

export class TodoList extends Observer{
    constructor(selectedUserState){
        super();
        this.selectedUserState = selectedUserState;
        console.log(selectedUserState)
    }
    template(){
        const todoList = this.selectedUserState.get().todoList;
        console.log(todoList)
        return `
            ${todoList.map(item =>`                
            <li class=${item.isCompleted?"completed":""}>
            <div class="view">
              <input class="toggle" type="checkbox" ${item.isCompleted?"checked":""} />
              <label class="label">
                ${this.getRanking(item.priority)}
                ${item.contents}
              </label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value="${item.contents}" />
          </li>
            `).join('')}
        ` 
    }
     
    render(){
        const target = $(".todo-list");
        target.innerHTML = this.template();
    }

    update(){
        this.render();
    }

    getRanking(priority){
        if(priority==PRIORITY.FIRST){
            return `
            <span class="chip primary">1순위</span>
            `
        }
        if(priority==PRIORITY.SECOND){
            return `
            <span class="chip secondary">2순위</span>
            `
        }
        if(priority==PRIORITY.NONE){
            return `
            <select class="chip select">
                  <option value="0" selected>순위</option>
                  <option value="1">1순위</option>
                  <option value="2">2순위</option>
            </select>
            `
        }
    }
   
}