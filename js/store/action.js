import { api } from '../lib/api.js';
import { message } from '../message/message.js';

export const actions = {
  loadUsersToDos(context) {
    context.commit('loadUsersToDos');
  },
  addToDo(context, payload) {
    context.commit('addToDo', payload);
  },
  destroyToDo(context, payload) {
    context.commit('destroyToDo', payload);
  },
  toggleToDo(context, payload) {
    context.commit('toggleToDo', payload);
  },
  editToDo(context, payload) {
    context.commit('editToDo', payload);
  },
  setFilterType(context, payload) {
    context.commit('setFilterType', payload);
  },
  setSelectedUserName(context, payload) {
    context.commit('setSelectedUserName', payload);
  },
  setSelectedUser(context, payload) {
    context.commit('setSelectedUser', payload);
  },
  addUser(context, payload) {
    context.commit('addUser', payload);
  },
  selectUsersToDo(context, payload) {
    context.commit('selectUsersToDo', payload);
  },
  deleteUser(context, payload) {
    context.commit('deleteUser', payload);
  },
  setPriority(context, payload) {
    context.commit('setPriority', payload);
  },
  deleteAllToDo(context) {
    context.commit('deleteAllToDo');
  },
  setIsLoading(context, payload) {
    context.commit('setIsLoading');
  },
};

export const mutations = {
  loadUsersToDos: async (state) => {
    mutations.setIsLoading(state, true);

    const userList = await api.loadToDos();

    if (userList !== null && userList !== '') {
      state.userList = userList;
      //첫 값을 선택된 user로 세팅
      mutations.setSelectedUser(state, userList[0]._id);
      mutations.setSelectedUserName(state, userList[0].name);

      mutations.selectUsersToDo(state, state.selectedUser);

      mutations.setIsLoading(state, false);
    } else {
      alert(message.failLoadUser);
      mutations.setIsLoading(state, false);
    }
    return state;
  },

  addToDo: async (state, payload) => {
    const userToDo = await api.addToDo(state.selectedUser, payload);
    if (userToDo !== null && userToDo !== '') {
      mutations.selectUsersToDo(state, state.selectedUser);
    } else {
      alert(message.failAddToDo);
    }
    return state;
  },

  destroyToDo: async (state, payload) => {
    const deleteToDo = await api.deleteToDo(state.selectedUser, payload);
    if (deleteToDo !== null && deleteToDo !== '') {
      mutations.selectUsersToDo(state, state.selectedUser);
    } else {
      alert(message.failDeleteToDo);
    }
    return state;
  },

  toggleToDo: async (state, payload) => {
    const toggleToDo = await api.toggleToDo(state.selectedUser, payload);
    if (toggleToDo !== null && toggleToDo !== '') {
      mutations.selectUsersToDo(state, state.selectedUser);
    } else {
      alert(message.failToggleUser);
    }
    return state;
  },

  editToDo: async (state, payload) => {
    const editToDo = await api.editToDo(
      state.selectedUser,
      payload.itemId,
      payload.contents
    );
    if (editToDo !== null && editToDo !== '') {
      mutations.selectUsersToDo(state, state.selectedUser);
    } else {
      alert(message.failEditUser);
    }
    return state;
  },

  setPriority: async (state, payload) => {
    const priorityToDo = await api.setPriorityToDo(
      state.selectedUser,
      payload.itemId,
      payload.priority
    );
    if (priorityToDo !== null && priorityToDo !== '') {
      mutations.selectUsersToDo(state, state.selectedUser);
    } else {
      alert(message.failPriorityUser);
    }
    return state;
  },

  setFilterType: (state, payload) => {
    state.filterType = payload;
    return state;
  },

  setSelectedUserName: (state, payload) => {
    state.selectedUserName = payload;
    return state;
  },

  setSelectedUser: (state, payload) => {
    state.selectedUser = payload;
    mutations.selectUsersToDo(state, payload);
    return state;
  },

  addUser: async (state, payload) => {
    const user = await api.addUser(payload);
    if (user !== null && user !== '') {
      mutations.loadUsersToDos(state);
    } else {
      alert(message.failAddUser);
    }
    return state;
  },

  selectUsersToDo: async (state, payload) => {
    const userToDo = await api.selectUserToDo(payload);
    if (userToDo !== null && userToDo !== '') {
      state.todos = userToDo;
    } else {
      alert(message.failLoadToDos);
    }
    return state;
  },

  deleteUser: async (state, payload) => {
    const message = await api.deleteUser(payload);
    if (message !== null && message !== '') {
      console.log(message.message);
      mutations.loadUsersToDos(state);
    } else {
      alert(message.failDeleteUser);
    }
    return state;
  },

  deleteAllToDo: async (state) => {
    const deleteToDo = await api.deleteAllToDo(state.selectedUser);
    if (deleteToDo !== null && deleteToDo !== '') {
      mutations.selectUsersToDo(state, state.selectedUser);
    } else {
      alert(message.failDeleteToDoAll);
    }
    return state;
  },

  setIsLoading: (state, payload) => {
    state.isLoading = payload;
    return state;
  },
};
