import {Component} from "../core/Component.js";
import {store} from "../modules/index.js";
import {changeFilter, fetchDeleteUserTodoItems} from "../modules/user/actions.js";
import {getFilteredList} from "../helper/userHelper.js";

const filters = [
    {title: "전체보기", href: "#", class: "all"},
    {title: "해야할 일", href: "#active", class: "active"},
    {title: "완료한 일", href: "#completed", class: "complete"},
];

function TodoCount(count) {
    return `<span class="todo-count">총 <strong>${count}</strong> 개</span>`;
}

function TodoFilterItem(filter, filtered) {
    return `
        <li>
            <a 
                data-action="filter"
                data-filter=${filter.class} 
                class="${filter.class} ${filtered == filter.class ? " selected" : ""}" 
                href=${filter.href} >
                ${filter.title}
            </a>
        </li>
    `
}

export default class TodoBottom extends Component {
    changeFilter(filter) {
        store.dispatch(changeFilter(filter))
    }

    deleteAll(userId) {
        store.dispatch(fetchDeleteUserTodoItems.REQUEST({userId}))
    }

    setEvent(target) {
        target.addEventListener('click', ({target}) => {
            const action = target.dataset.action;

            switch (action) {
                case "filter":
                    const selectedFilter = target.dataset.filter;
                    this.changeFilter(selectedFilter);
                    break;
                case "deleteAll":
                    const {_id: userId} = store.getState().selectedUser;

                    if(confirm("정말 모든 할일을 삭제하시겠습니까?")) {
                        this.deleteAll(userId);
                    }
                    break;
                default:
                    break;
            }

            event.stopImmediatePropagation();
        })
    }

    render() {
        const {filtered, selectedUser} = store.getState();
        const filteredList = selectedUser ? getFilteredList(selectedUser.todoList, filtered) : [];

        return `
            ${TodoCount(filteredList.length)}
            <ul class="filters">
                ${filters.map(filter => TodoFilterItem(filter, filtered)).join('')}
            </ul>
            <button 
                data-action="deleteAll"
                class="clear-completed">
                모두 삭제
            </button>
        `
    }
}
