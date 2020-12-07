export default {
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
    loadToDos(context){
        context.commit('loadToDos');
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