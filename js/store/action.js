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
    setPriority(context, payload){
        context.commit('setPriority', payload);

    }
}


export const mutations = {

    loadUsersToDos : async (state) => {
        const userList = await api.loadToDos();
        if(userList!==null && userList!==''){
            state.userList = userList;
            //첫 값을 선택된 user로 세팅
            mutations.setSelectedUser(state, userList[0]._id );
            mutations.selectUsersToDo(state, state.selectedUser);
        }
    },
    
    addToDo : async (state, payload) => {
        const userToDo = await api.addToDo(state.selectedUser, payload);
        if(userToDo!==null && userToDo!==''){
            mutations.selectUsersToDo(state, state.selectedUser);
        }
        return state;
    },
    
    destroyToDo : async (state, payload) => {
        const deleteToDo = await api.deleteToDo(state.selectedUser, payload);
        if(deleteToDo!==null && deleteToDo!==''){
            mutations.selectUsersToDo(state, state.selectedUser);
        }
        return state;
    },
    
    toggleToDo : async (state, payload) => {
        const toggleToDo = await api.toggleToDo(state.selectedUser, payload);
        if(toggleToDo!==null && toggleToDo!==''){
            mutations.selectUsersToDo(state, state.selectedUser);
        }
        return state;
    },
    
    editToDo : async (state, payload) => {
        const editToDo = await api.editToDo(state.selectedUser, payload.itemId, payload.contents);
        if(editToDo!==null && editToDo!==''){
            mutations.selectUsersToDo(state, state.selectedUser);
        }
        return state;
    },

    setPriority : async (state, payload) => {
        const priorityToDo = await api.setPriorityToDo(state.selectedUser, payload.itemId, payload.priority);
        if(priorityToDo!==null && priorityToDo!==''){
            console.log(priorityToDo)
            mutations.selectUsersToDo(state, state.selectedUser);
        }
        return state;
    },

    setFilterType : (state, payload) => {
        state.filterType = payload;
    },

    setSelectedUser : async (state, payload) => {
        state.selectedUser = payload;
        mutations.selectUsersToDo(state, payload);
    },

    addUser : async (state, payload) => {
        const user = await api.addUser(payload);
        if(user!==null && user!==''){
            mutations.loadUsersToDos(state);
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
            console.log(message.message);
            mutations.loadUsersToDos(state);
        }
    }

}