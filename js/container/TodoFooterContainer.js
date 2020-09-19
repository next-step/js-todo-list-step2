import TodoFooter from "../components/TodoFooter.js";
import {setTodoFilter} from "../reducer.js";
function TodoFooterContainer($dom, store) {
    let prevFilter;
    let prevTodoList;

    $dom.addEventListener('click',({target:{dataset}})=>{
        const {role, value:filter} = dataset;
        switch (role){
            case 'filter':{
                store.dispatch(setTodoFilter({filter}))
            }
        }
    });

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