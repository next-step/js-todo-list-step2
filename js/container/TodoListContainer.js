import {setTodoItem} from "../reducer.js";
import TodoList from "../components/TodoList.js";
import {toggleTodoItemComplete} from "../api/index.js";
import TodoSkeleton from '../components/TodoSkeleton.js';
import {PENDING, SUCCESS} from "../constant.js";

function TodoListContainer($dom, store) {
    let prevStatus;
    let prevTodoList;

    $dom.addEventListener('change', async ({target}) => {
        const targetId = target.dataset.id;
        const {selectedUserId} = store.getState();
        const todoItem = await toggleTodoItemComplete(selectedUserId, targetId);
        store.dispatch(setTodoItem({todoItem}));


    })

    return () => {
        const {status, todoList} = store.getState();
        if (prevStatus !== status || prevTodoList !== todoList) {
            prevStatus = status;
            prevTodoList = todoList;
            switch (status) {
                case PENDING: {
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
