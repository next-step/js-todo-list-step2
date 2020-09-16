import {Component} from "../../core/Component.js";


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

    constructor($target, event, props) {
        super($target, event, props)

    }

    setTodoList(todoList) {
        this.todoList = todoList;
        this.render();
    }

    render() {

        const countTodoList = this.todoList.length;
        const completedTodoFilter = this.todoList.filter(todo => todo.isCompleted === true);
        const countCompletedTodoList = completedTodoFilter.length;
        const todoCountTemplate = template(countTodoList, countCompletedTodoList);
        this.$target.innerHTML = todoCountTemplate;
    }

}