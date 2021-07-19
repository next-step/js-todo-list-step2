import Observer from "../core/observer.js";
import { PRIORITY } from "../constants/constants.js"
import { $, $$ } from "../util/util.js";
import { userAPI, todoAPI } from "../api/api.js";

export class TodoList extends Observer{
    constructor(selectedUserState, filterState){
        super();
        this.selectedUserState = selectedUserState;
        this.filterState = filterState;
        console.log(filterState)
    }
    template(){
        const todoList = this.selectedUserState.get().todoList;
        console.log(this.filterState);
        const filteredList = (() =>{
            const mode = this.filterState.get();
            if(mode=='all'){
                return todoList;
            }
            if(mode=='active'){
                return todoList.filter(item => !item.isCompleted)
            }
            if(mode=='completed'){
                return todoList.filter(item => item.isCompleted)
            }
        })();
        return `
            ${filteredList.map(item =>`                
            <li class=${item.isCompleted?"completed":""}>
            <div class="view">
              <input id="${item._id}" class="toggle" type="checkbox" ${item.isCompleted?"checked":""} />
              <label class="label">
                ${this.getRanking(item.priority)}
                ${item.contents}
              </label>
              <button id="${item._id}" class="destroy"></button>
            </div>
            <input class="edit" value="${item.contents}" />
          </li>
            `).join('')}
        ` 
    }
     
    render(){
        const target = $(".todo-list");
        target.innerHTML = this.template();
        this.mounted();
    }

    mounted(){
        const toggleBtns = $$('.toggle');
        toggleBtns.forEach(Btn => Btn.addEventListener('click',this.onToggleTodo.bind(this)));
    
        const deleteBtns = $$('.destroy');
        deleteBtns.forEach(Btn => Btn.addEventListener('click', this.onDeleteTodo.bind(this)));
    }

    update(){
        this.render();
    }

    async onToggleTodo(e){
        const itemId = e.target.id;
        const userId = this.selectedUserState.get()._id;
        await todoAPI.toggleTodoItem(userId, itemId);
        const data = await userAPI.getUser(userId);
        this.selectedUserState.set(data);
    }

    async onDeleteTodo(e){
        console.log(e);
        const itemId = e.target.id;
        const userId = this.selectedUserState.get()._id;
        console.log(itemId);
        console.log(userId);
        const response = await todoAPI.deleteTodoItem(userId, itemId);
        console.log(response);
        if(response.ok){
            const data = await userAPI.getUser(userId);
            this.selectedUserState.set(data);
        }
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