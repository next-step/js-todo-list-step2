import TodoFooter from "../components/TodoFooter.js";
function TodoFooterContainer($dom, store) {
    let prevFilter;
    let prevTodoList;

    return () => {
        const {filter, todoList } = store.getState();
        if (prevFilter !== filter || prevTodoList !== todoList) {
            prevFilter=filter;
            prevTodoList=todoList;
            $dom.innerHTML = TodoFooter({filter, filteredList:todoList});
        }
    }
}

export default TodoFooterContainer;