import TodoList from "../components/TodoList.js";
import TodoSkeleton from '../components/TodoSkeleton.js';
import {PENDING, SUCCESS} from "../constant.js";

function TodoListContainer($dom, store) {
    let prevStatus;
    let prevTodoList;

    return () => {
        const {status, todoList} = store.getState();
        if (prevStatus !== status || prevTodoList !== todoList) {
            prevStatus = status;
            prevTodoList = todoList;
            switch (status) {
                case PENDING:{
                    $dom.innerHTML = TodoSkeleton();
                    break;
                }
                case SUCCESS: {
                    $dom.innerHTML = TodoList({todoList});
                    break;
                }
            }
        }
    }
}

export default TodoListContainer;
