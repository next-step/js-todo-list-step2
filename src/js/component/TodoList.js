import Observer from "../core/observer.js";
import { PRIORITY } from "../constants/constants.js"
import { $, $$ } from "../util/util.js";
import { userAPI, todoAPI } from "../api/api.js";

export class TodoList extends Observer{
    constructor(selectedUserState, filterState){
        super();
        this.selectedUserState = selectedUserState;
        this.filterState = filterState;
    }
    
     template(){      
        const todoList =  this.selectedUserState.get().todoList;
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
              <label id="${item._id}" class="label">
                ${this.getRanking(item.priority)}
                ${item.contents}
              </label>
              <button id="${item._id}" class="destroy"></button>
            </div>
            <input id="${item._id}" class="edit" value="${item.contents}" />
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
    
        const editBtns = $$('.label');
        editBtns.forEach(Btn =>  Btn.addEventListener('dblclick', this.onEditTodo.bind(this)));
    
        const editInputs = $$('.edit');
        editInputs.forEach(Btn => Btn.addEventListener('keydown', this.onEditKey.bind(this)));
    
        const selectedBoxs = $$('.select');
        selectedBoxs.forEach(Btn => Btn.addEventListener('click', this.onSelectPriority.bind(this)));
    }

    update(){
        this.render();
    }

    onEditTodo(e){
        e.stopPropagation();
        console.log(e.target);
        const _edit = $$('.todo-list > li');
        _edit.forEach((li) => {
            li.classList.remove('editing');
        });
        e.target.parentNode.parentNode.classList.add('editing');
    }
    async onSelectPriority(e){
        e.stopPropagation();
        const selectedPriroty = e.target.value;
        if(selectedPriroty == PRIORITY.NONE) return;

        const itemId = e.target.parentNode.id;
        const userId = this.selectedUserState.get()._id;
        
        const response = await todoAPI.updateTodoPriority(userId, itemId, {"priority": selectedPriroty});
        if(response.ok){
            const data = await userAPI.getUser(userId);
            this.selectedUserState.set(data);
        }
    }

    async onEditKey(e){
        e.stopPropagation();
        if (e.key == 'Enter') {
           const userId = this.selectedUserState.get()._id;
           const itemId = e.target.id;
           const newItem = e.target.value;
           const response = await todoAPI.updateTodoItem(userId, itemId, {"contents": newItem});
            if(response.ok){
                const data = await userAPI.getUser(userId);
                this.selectedUserState.set(data);
           }
        }
        if (e.key == 'Escape') {
            e.target.parentNode.classList.remove('editing');
        }
    }


    async onToggleTodo(e){
        const itemId = e.target.id;
        const userId = this.selectedUserState.get()._id;
        await todoAPI.toggleTodoItem(userId, itemId);
        const data = await userAPI.getUser(userId);
        this.selectedUserState.set(data);
    }

    async onDeleteTodo(e){
        const itemId = e.target.id;
        const userId = this.selectedUserState.get()._id;
        const response = await todoAPI.deleteTodoItem(userId, itemId);
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
            <select  class="chip select">
                  <option value="NONE" selected>순위</option>
                  <option value="FIRST">1순위</option>
                  <option value="SECOND">2순위</option>
            </select>
            `
        }
    }
}