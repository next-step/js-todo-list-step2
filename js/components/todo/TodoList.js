import {Component} from "../../core/Component.js";




export class TodoList extends Component {
    todoList;
    userId;


    todoListArrayTemplate = todoArray => {
        return todoArray
            .map((todo) =>
                this.todoListTemplate(todo.isCompleted, todo._id, this.priorityTemplate(todo.priority), todo.contents)

            ).join('');
    }

    todoListTemplate = (isCompleted, id, todoPriorityTemplate, contents) => {
        return `
        <li ${isCompleted ? 'class=completed' : ''} data-todo-id="${id}">
            <div class="view">
                <input class="toggle" type="checkbox" ${isCompleted ? 'checked' : ''}/>
                <label class="label">
                    ${todoPriorityTemplate}
                    <span class="label-content">${contents}</span>
                </label>
                <button class="destroy"></button>
            </div>
            <input class="edit" placeholder="${contents}" value="" />
        </li>          
    `;
    }

    priorityTemplate = (priority) => {
        if (priority === 'NONE') {
            return `<select class="chip select">
            <option value="NONE" selected>순위</option>
            <option value="FIRST">1순위</option>
            <option value="SECOND">2순위</option>
        </select>
    `;
        }
        if (priority === 'FIRST') {
            return `<select class="chip primary">
            <option value="NONE" >순위</option>
            <option value="FIRST" selected>1순위</option>
            <option value="SECOND">2순위</option>
        </select>
    `;
        }
        if (priority === 'SECOND') {
            return `<select class="chip secondary">
            <option value="NONE" >순위</option>
            <option value="FIRST">1순위</option>
            <option value="SECOND" selected>2순위</option>
        </select>
    `;
        }

    }

    constructor($target, event, props) {
        super($target, event, props);
        this.todoList = [];
        this.userId = '';
        this.$target.addEventListener('click', ({target}) => {
            if (target && target.classList.contains('toggle')) {
                const {$li, todoId} = this.#getItemId(target);
                this.event.isCompleteTodo(this.userId, todoId);
                return;
            }
            if (target && target.classList.contains('destroy')) {
                const {$li, todoId} = this.#getItemId(target);
                this.event.deleteTodo(this.userId, todoId);
                return;
            }
        })
        this.$target.addEventListener('change' , ({target})=>{
            if(target && target.tagName==="SELECT"){
                const {$li, todoId} = this.#getItemId(target);
                this.event.changeTodoPriority(this.userId , todoId,target.value)
            }
        })
        this.$target.addEventListener('dblclick', ({target}) => {
            if (target && target.classList.contains("label")) {
                const {$li , todoId} = this.#getItemId(target);
                $li.classList.add("editing");
                return;
            }
        })
        this.$target.addEventListener('keyup', ({target, key}) => {
            if (target && target.classList.contains('edit') && key === 'Enter') {
                const {$li, todoId} = this.#getItemId(target);
                const $label = $li.querySelector('.label-content');
                $li.classList.remove('editing');
                if (target.value !== $label.textContent) {
                    this.event.editTodo(this.userId, todoId, target.value)
                }
                return;
            }
            if (target && target.classList.contains('edit') && key === 'Escape') {
                const {$li, todoId} = this.#getItemId(target);
                $li.classList.remove('editing');
                return;
            }
        })

    }

    #getItemId(target) {
        const $li = target.closest("li");
        return {$li, todoId: $li.dataset.todoId}
    }

    setUserId(userId) {
        this.userId = userId;
    }

    setTodoList(todoList) {
        this.todoList = todoList;
        this.render();
    }

    render() {

        this.$target.innerHTML = this.todoListArrayTemplate(this.todoList);

    }

}
