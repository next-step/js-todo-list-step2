import TodoState from "./TodoState.js";
import { fetcher } from "./fetcher.js";
import fetchParams from "./fetchParams.js";
import * as util from "./util.js";
export default new class TodoList{
    constructor(){
        this.$todoList = document.querySelector(".todo-list");
        this.eventController(this.$todoList);
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
        document.querySelector(".todo-count strong").innerText = newItems.length;
    }

    async toggleCompleted(target){
        const $li = util.getLi(target);
        const index = util.getIndex($li);
        const item_id = TodoState.itemId(index)
        this.skeltonTemplate($li);
        await fetcher(fetchParams.toggleCompleted(TodoState.userId,item_id))
        await this.refreshList();
    }

    toggleEditing(target){
        util.getLi(target).classList.toggle("editing");
        util.qs(".edit",util.getLi(target)).focus();
    }
    
    async updatePriority(target){
        const $li = util.getLi(target);
        const index = util.getIndex($li);
        const item_id = TodoState.itemId(index)
        const select = Number(target.value);
        const priority = select === 0 ? "NONE" : select === 1 ? "FIRST" : "SECOND";
        this.skeltonTemplate($li);
        
        await fetcher(fetchParams.updatePriority(TodoState.userId,item_id,priority));
        await this.refreshList();
    }

    async updateContents(target,key){
        const $li = util.getLi(target);
        const index = util.getIndex(util.getLi(target));
        const item_id = TodoState.itemId(index);
        const title = util.qs("label",util.getLi(target)).lastChild.textContent;
        const newTitle = target.value;
        if(key === 'Enter' && !!newTitle.trim() && title !== newTitle){
            $li.outerHTML = this.skeltonTemplate();
            await fetcher(fetchParams.updateContents(TodoState.userId,item_id,target.value))
            await this.refreshList();
        }
        else{
            target.value = title;
            util.getLi(target).classList.toggle("editing");
        }
    }

    async delete(target){
        if(confirm("정말로 삭제하시겠습니까?")){
            const $li = util.getLi(target)
            const index = util.getIndex($li);
            const item_id = TodoState.itemId(index);
            this.skeltonTemplate($li);

            await fetcher(fetchParams.deleteItem(TodoState.userId,item_id))
            await this.refreshList();
        }
    }

    async deleteAll(){
        if(confirm("주의! 정말로 전체 삭제하시겠습니까!?")){
            Array.from(util.qsa("li",this.$todoList)).forEach(e=>this.skeltonTemplate(e));
            await fetcher(fetchParams.deleteAllItem(TodoState.userId));
            await this.refreshList();
        }
    }
 
    async refreshList(){
        const items = await fetcher(fetchParams.userItem(TodoState.userId))
        this.makeList(items);
    }

    skeltonTemplate(target){
        const template = `
        <li>
        <div class="view">
            <label class="label">
            <div class="animated-background">
                <div class="skel-mask-container">
                <div class="skel-mask"></div>
                </div>
            </div>
            </label>
        </div>
        </li>
        `
        return target ? target.innerHTML = template : template
    }
    todoTemplate({contents,isCompleted,priority}){
        const span = 
            priority == "FIRST" ? 
            `<span class="chip primary">1순위</span>` :
            priority == "SECOND" ? 
            `<span class="chip secondary">2순위</span>` :
            `<select class="chip select">
            <option value="0" selected>순위</option>
            <option value="1">1순위</option>
            <option value="2">2순위</option>
            </select>`;
        
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
            if(target.classList.contains("chip")) this.updatePriority(target)
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
