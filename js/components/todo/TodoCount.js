import {Component} from "../../core/Component.js";
import {filterConstant} from "../../constants/constants.js";


const template = (todoCounter,completeCounter) => {

    return `
        <span class="todo-count">총 <strong>${todoCounter}</strong> 개</span>        
        <span id="completed-count" class="todo-count">
                <span class="count">${completeCounter}</span> 개 완료
        </span>
             <ul class="filters">
                <li>
                    <a href="#" class="all selected">전체보기</a>
                </li>
                <li>
                    <a href="#active" class="active">해야할 일</a>
                </li>
                <li>
                    <a href="#completed" class="completed">완료한 일</a>
                </li>
            </ul>
            
        <button class="clear-completed">모두 삭제</button>
    `;
}

export class TodoCount extends Component {
    todoList;
    userId;
    constructor($target, event, props) {
        super($target, event, props)

        this.$target.addEventListener('click' , e=>{
            if(e.target.className === 'clear-completed'){
                this.event.clearTodo(this.userId);
            }
            if (e.target.className === 'all selected') {
                this.event.setFilter(filterConstant.ALL);
            }
            if (e.target.className === 'active') {
                this.event.setFilter(filterConstant.ACTIVE);
            }
            if (e.target.className === 'completed') {
                this.event.setFilter(filterConstant.COMPLETED);
            }
        })
    }

    setTodoList(todoList) {
        this.todoList = todoList;
        this.render();
    }

    setUserId(userId){
        this.userId=userId;
    }
    render() {

        const countTodoList = this.todoList.length;
        const completedTodoFilter = this.todoList.filter(todo => todo.isCompleted === true);
        const countCompletedTodoList = completedTodoFilter.length;
        const todoCountTemplate = template(countTodoList, countCompletedTodoList);
        this.$target.innerHTML = todoCountTemplate;
    }

}