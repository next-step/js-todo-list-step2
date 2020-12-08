import Filter from "../constants/Filter.js";

function getFilteredList(todoList = [], filtered = Filter.ALL) {
    return todoList.filter(todo => (filtered === Filter.ALL) || (filtered === Filter.ACTIVE && !todo.isCompleted) || (filtered === Filter.COMPLETE && todo.isCompleted));
}

export {
    getFilteredList
}