import api from '../lib/api.js';
import store from './store.js';

export const actions = {
    
    loadUsersToDos(context){
        context.commit('loadUsersToDos');
    },
    addToDo(context, payload){
        context.commit('addToDo', payload);
    },
    destroyToDo(context, payload){
        context.commit('destroyToDo', payload);
    },
    toggleToDo(context, payload){
        context.commit('toggleToDo', payload);
    },
    editToDo(context, payload){
        context.commit('editToDo', payload);
    },
    setFilterType(context, payload){
        context.commit('setFilterType', payload);
    },
    setSelectedUser(context, payload){
        context.commit('setSelectedUser', payload);
    },
    addUser(context, payload){
        context.commit('addUser', payload);
    },
    selectUsersToDo(context, payload){
        context.commit('selectUsersToDo', payload);
    },
    deleteUser(context, payload){
        context.commit('deleteUser', payload);
    },
}


export const mutations = {

    loadUsersToDos : async (state) => {
        const userList = await api.loadToDos();
        if(userList!==null && userList!==''){
            state.userList = userList;
            //첫 값을 선택된 user로 세팅
            mutations.setSelectedUser(state, userList[0]._id);
            mutations.selectUsersToDo(state, userList[0]._id);
        }
    },

    addToDo : async (state, payload) => {
        const userToDo = await api.addToDo(state.selectedUser, payload);
        if(userToDo!==null && userToDo!==''){
            mutations.selectUsersToDo(state, state.selectedUser);
        }
        return state;
    },

    destroyToDo : (state, payload) => {
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

    setSelectedUser : async (state, payload) => {
        state.selectedUser = payload;
        mutations.selectUsersToDo(state, payload);
    },

    addUser : async (state, payload) => {
        const user = await api.addUser(payload);
        if(user!==null && user!==''){
            mutations.loadToDos(state);
        }
        return state;
    },

    selectUsersToDo : async (state, payload) => {
        const userToDo = await api.selectUserToDo(payload);
        console.log(userToDo.todoList)
        if(userToDo!==null && userToDo!==''){
            state.todos = userToDo;
        }
        return state;
    },

    deleteUser : async (state, payload) => {
        const message = await api.deleteUser(payload);
        if(message!==null && message!==''){
            alert(message.message);
            mutations.loadToDos(state);
        }
    }

}