import api from '../lib/api.js'

const TODOS_LIST = 'todoList';

export default {
    addToDo(state, payload){
        state.todos.todoList.push(payload);
        //saveToDos(TODOS_LIST, state.todoList);
        return state;
    },
    destroyToDo(state, payload){
        state.todos.todoList.splice(payload-1, 1); //인덱스 배열 삭제
        //saveToDos(TODOS_LIST, state.todoList);
        return state;
    },
    toggleToDo(state, payload){
        payload.isCompleted = !payload.isCompleted; //토글
        state.todos.todoList.splice(payload.id-1, 1, payload);
        //saveToDos(TODOS_LIST, state.todoList);
        return state;
    },
    editToDo(state, payload){
        state.todos.todoList.splice(payload.id-1, 1, payload);
        //saveToDos(TODOS_LIST, state.todos.todoList);
        return state;
    },
    setFilterType(state, payload){
        state.filterType = payload;
    },
    loadToDos(state){
        const init = async () => {
            try {
                const userList = await api.loadToDos();
                state.userList = userList;
              } catch (err) {
                console.error(err);
              }
        }
        init()
    }
}