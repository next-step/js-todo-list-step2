import {Component} from "../core/Component.js";
import {store} from "../modules/index.js";
import {
    setPriorityUserTodoItem,
    fetchToggleUserTodoItem,
    fetchDeleteUserTodoItem
} from "../modules/user/actions.js";
import TodoPriority from "../constants/TodoPriority.js";
import TodoPriorityClassName from "../constants/TodoPriorityClassName.js";
import {getFilteredList} from "../helper/userHelper.js";

function PrioritySelect(priority) {
    return `
        ${priority === TodoPriority.NONE ?
            `<select class="chip select">
                <option value="0" selected>순위</option>
                <option value="1">1순위</option>
                <option value="2">2순위</option>
             </select>` :
            `<span class="chip ${TodoPriorityClassName[priority]}">
                ${priority === TodoPriority.FIRST ? "1순위" : "2순위"}
            </span>`
        }
    `
}

function TodoItem(todo) {
    return `
        <li 
            class="${todo.isCompleted ? "complete" : ""}"
            data-id=${todo._id}>
          <div class="view">
            <input class="toggle" 
                   type="checkbox" 
                   data-action="toggle"
                   ${todo.isCompleted ? "checked" : ""}/>
            <label class="label">
              ${PrioritySelect(todo.priority)}
              ${todo.contents}
            </label>
            <button class="destroy" data-action="delete"></button>
          </div>
          <input class="edit" value="완료된 타이틀" />
        </li>
    `
}

export default class TodoList extends Component {

    setPriorityTodoItem(userId, itemId, priority) {
        store.dispatch(setPriorityUserTodoItem.REQUEST({userId, itemId, priority}))
    }

    toggleTodoItem(userId, itemId) {
        store.dispatch(fetchToggleUserTodoItem.REQUEST({userId, itemId}))
    }

    deleteTodoItem(userId, itemId) {
        store.dispatch(fetchDeleteUserTodoItem.REQUEST({userId, itemId}))
    }

    setEvent(target) {
        target.addEventListener("change", ({target}) => {
            const {_id: userId} = store.getState().selectedUser;
            const todoId = target.closest(`[data-id]`).dataset.id;
            const {value} = target;
            const priority = value == 1 ? TodoPriority.FIRST : TodoPriority.SECOND;

            this.setPriorityTodoItem(userId, todoId, priority);
        });

        target.addEventListener("click", ({target}) => {
            const action = target.dataset.action;
            const {_id: userId} = store.getState().selectedUser;
            const todoId = target.closest(`[data-id]`).dataset.id;

            switch (action) {
                case "toggle":
                    this.toggleTodoItem(userId, todoId);
                    break;

                case "delete":
                    if (confirm("정말 삭제하시겠습니까?")) {
                        this.deleteTodoItem(userId, todoId)
                    }
                    break;

                default:
                    break;
            }

            event.stopImmediatePropagation();
        });
    }

    render() {
        const {filtered, selectedUser} = store.getState();
        const filteredList = selectedUser ? getFilteredList(selectedUser.todoList, filtered) : [];

        return `
            ${filteredList.map(todo => TodoItem(todo)).join('')}
        `
    }
}
