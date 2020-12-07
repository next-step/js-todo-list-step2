import api from '../lib/api.js'
import state from './state.js';

const TODOS_LIST = 'todoList';

export default {
    addToDo(state, payload){
        const init = async () => {
            const userToDo = await api.addToDo(state.selectedUser, payload);
            if(userToDo!==null && userToDo!==''){
                this.selectUsersToDo(state, state.selectedUser);
            }
        }
        init()
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
            const userList = await api.loadToDos();
            console.log(userList)
            if(userList!==null && userList!==''){
                state.userList = userList;
                //첫 값을 선택된 user로 세팅
                this.setSelectedUser(state, userList[0]._id);
                this.selectUsersToDo(state, state.selectedUser);
            }
        }
        init()
    },
    setSelectedUser(state, payload){
        state.selectedUser = payload;
        this.selectUsersToDo(state, state.selectedUser);
    },
    addUser(state, payload){
        const init = async () => {
            const user = await api.addUser(payload);
            if(user!==null && user!==''){
                this.loadToDos(state);
            }
        }
        init()
        return state;
    },
    selectUsersToDo(state, payload){
        const init = async () => {
            const userToDo = await api.selectUserToDo(payload);
            console.log(userToDo.todoList)
            if(userToDo!==null && userToDo!==''){
                state.todos = userToDo;
            }
        }
        init()
        return state;
    },
    deleteUser(state, payload){
        const init = async () => {
            const message = await api.deleteUser(payload);
            if(message!==null && message!==''){
                alert(message.message);
                this.loadToDos(state);
            }
        }
        init()
    }

}