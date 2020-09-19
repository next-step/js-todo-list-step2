import TodoState from "./TodoState.js";
import { fetcher } from "./fetcher.js";
import fetchParams from "./fetchParams.js";
export default new class TodoList{
    constructor(){
        this.$todoList = document.querySelector(".todo-list");
        this.eventController(this.$todoList);
        this.makeList.bind(this);
        this.refreshList.bind(this);
    }

    makeList = (items) => {
        if(!items) return this.$todoList.innerHTML = '';
        const newItems = items.filter(item => 
            (TodoState.view === 'all') ||
            (TodoState.view === 'completed' && item.isCompleted) ||
            (TodoState.view === 'active' && !item.isCompleted))
        const template = newItems.map((item) => this.todoTemplate({...item}));
        this.$todoList.innerHTML = template.join("");
        TodoState.user.todoList = newItems;
        console.log(
            "%c"+TodoState.user.name+
            "[%c"+TodoState.user._id+
            "%c]",
            "font-weight:bold;","color:red;","color:black;",
            "loaded!");
    }

    toggleCompleted(target){
        const $li = getLi(target);
        const index = getIndex($li);
        const item_id = TodoState.user.todoList[index]._id;
        fetcher(fetchParams.toggleCompleted(TodoState.user._id,item_id),this.refreshList);
    }

    toggleEditing(target){
        getLi(target).classList.toggle("editing");
        qs(".edit",getLi(target)).focus();
    }
    
    updateContents(target,key){
        const index = getIndex(getLi(target));
        const item_id = TodoState.user.todoList[index]._id;
        const title = qs("label",getLi(target)).lastChild.textContent;
        const newTitle = target.value;
        if(key === 'Enter' && !!newTitle.trim() && title !== newTitle){
            fetcher(fetchParams.updateContents(TodoState.user._id,item_id,target.value),this.refreshList)
        }
        else{
            target.value = title;
            getLi(target).classList.toggle("editing");
        }
    }

    delete(target){
        if(confirm("정말로 삭제하시겠습니까?")){
            const $li = getLi(target)
            const index = getIndex($li);
            const item_id = TodoState.user.todoList[index]._id;
            fetcher(fetchParams.deleteItem(TodoState.user._id,item_id),this.refreshList);
        }
    }

    deleteAll(){
        if(confirm("주의! 정말로 전체 삭제하시겠습니까!?")){
            fetcher(fetchParams.deleteAllItem(TodoState.user._id),this.refreshList)
        }
    }
 
    refreshList = () => {
        fetcher(fetchParams.userItem(TodoState.user._id),this.makeList)
    }

    todoTemplate({contents,isCompleted,priority}){
        const span = priority == "NONE" ? 
        `<select class="chip select">
            <option value="0" selected>순위</option>
            <option value="1">1순위</option>
            <option value="2">2순위</option>
        </select>` 
        : priority == "FIRST" ? 
          `<span class="chip primary">1순위</span>`
        : `<span class="chip secondary">2순위</span>`;
        
        return `
        <li ${isCompleted ? 'class="completed"':""}>
            <div class="view">
                <input class="toggle" type="checkbox" ${isCompleted && "checked"}/>
                <label class="label">${span}${contents}</label>
                <button class="destroy"></button>
                </div>
            <input class="edit" value="${contents}" />
        </li>
        `
    }

    eventController(todoList){
        todoList.addEventListener("change", ({target}) => {
            if(target.classList.contains("toggle")) this.toggleCompleted(target) 
        })
        todoList.addEventListener("click", ({target})=>{
            if(target.classList.contains("destroy")) this.delete(target)
        })
        todoList.addEventListener("dblclick", ({target}) => {
            if(target.classList.contains("label")) this.toggleEditing(target);
        })
        todoList.addEventListener("keyup", ({target,key}) => {
            if(['Enter','Escape'].includes(key)) this.updateContents(target,key)
        });
    }
}
