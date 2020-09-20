import TodoFooter from "../components/TodoFooter.js";
import {setTodoFilter, setTodoList} from "../reducer.js";
import {deleteAllTodoItem} from "../api/index.js";

function TodoFooterContainer($dom, store) {
    let prevFilter;
    let prevTodoList;

    $dom.addEventListener('click', async ({target: {dataset}}) => {
        const {role, value: filter} = dataset;
        switch (role) {
            case 'filter': {
                store.dispatch(setTodoFilter({filter}))
                break;
            }
            case 'clear': {
                const {selectedUserId} = store.getState();
                const {success} = await deleteAllTodoItem(selectedUserId);
                if (success) {
                    alert('삭제 완료');
                    store.dispatch(setTodoList({todoList: []}))
                }
                break;
            }
        }
    });

    return () => {
        const {filter, todoList} = store.getState();
        if (prevFilter !== filter || prevTodoList !== todoList) {
            prevFilter = filter;
            const filteredTodoList = todoList.filter(({isCompleted}) => {
                switch (filter) {
                    case 'all':
                        return true;
                    case 'active':
                        return !isCompleted;
                    case 'completed':
                        return isCompleted;
                }

            });
            prevTodoList = todoList;
            $dom.innerHTML = TodoFooter({filter, filteredTodoList});
        }
    }
}

export default TodoFooterContainer;