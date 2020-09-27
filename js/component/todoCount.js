import TodoState from "../TodoState.js";
import TodoList from "./todoList.js";
import * as util from "../util/util.js"; 
export default new class TodoCount{
    constructor(){
        this.$todoCount = util.qs(".count-container");
        this.$todoFilters = util.qs(".filters",this.$todoCount);
        this.filterButtons = [
            { type: 'all', text: "전체보기" },
            { type: 'active', text: "해야할 일" },
            { type: 'completed', text: "완료한 일" },
        ];
        this.selectedType = this.filterButtons[0].type;
        
        this.eventController(this.$todoCount)
        this.render();
    }

    viewChange(target){
        this.selectedType = TodoState.view = target.dataset.type;
        TodoList.refreshList();
        this.render();
    }

    render = () => {
        this.$todoFilters.innerHTML = this.filterButtons.map(({ type, text })=> `
            <li>
                <a href="#" data-type="${type}" class="${type} ${type === this.selectedType ? 'selected' : ''}">${text}</a>
            </li>
        `).join('');
    }

    eventController(todoCount){
        todoCount.addEventListener("click", ({target}) => {
            if(target.nodeName == "BUTTON") TodoList.deleteAll()
        })
        util.qs(".filters",todoCount).addEventListener("click", ({target}) =>{
            if(target.nodeName == "A") this.viewChange(target);
        })
    }
}
