import {SUCCESS} from './constant.js'
import {actionCreator} from "./redux.js";

const SET_STATUS = 'setStatus';
const SET_USER_LIST = 'setUserList';
const SET_USER_ID = 'setUserId';
const SET_APP = 'setApp';
const SET_TODO_LIST = 'setTodoList';
const ADD_USER = 'addUser';
const REMOVE_USER = 'removeUser';
const ADD_TODO_ITEM = 'addTodoItem';
const SET_TODO_ITEM = 'setTodoItem';
const TOGGLE_TODO_ITEM = 'toggleTodoItem';
const SET_TODO_FILTER = 'setTodoFilter';

export const setStatus = ({status}) => actionCreator(SET_STATUS, {status});
export const setUserList = ({userList, selectedUserId}) => actionCreator(SET_USER_LIST, {userList, selectedUserId});
export const setApp = ({userList, selectedUserId, todoList}) => actionCreator(SET_APP, {
    userList,
    selectedUserId,
    todoList
});
export const setUserId = ({selectedUserId}) => actionCreator(SET_USER_ID, {selectedUserId});
export const setTodoList = ({todoList}) => actionCreator(SET_TODO_LIST, {todoList});
export const addUser = ({user}) => actionCreator(ADD_USER, {user});
export const removeUser = ({userId}) => actionCreator(REMOVE_USER, {userId});
export const addTodoItem = ({todoItem}) => actionCreator(ADD_TODO_ITEM, {todoItem});
export const setTodoItem = ({todoItem}) => actionCreator(SET_TODO_ITEM, {todoItem});
export const toggleTodoItem = ({todoItemId}) => actionCreator(TOGGLE_TODO_ITEM, {todoItemId});
export const setTodoFilter = ({filter}) => actionCreator(SET_TODO_FILTER,{filter});

const initState = {
    filter: 'all',
    status: '',
    userList: [],
    todoList: [],
    selectedUserId: null,
}

const reducer = (state = initState, {type, payload}) => {
    switch (type) {
        case SET_STATUS: {
            const {status} = payload;
            return {
                ...state,
                status
            }
        }
        case SET_USER_LIST: {
            const {userList, selectedUserId} = payload;
            return {
                ...state,
                userList,
                selectedUserId,
            }
        }
        case SET_APP: {
            const {userList, selectedUserId, todoList} = payload;
            return {
                ...state,
                status: SUCCESS,
                selectedUserId,
                userList,
                todoList,
            }
        }
        case SET_USER_ID: {
            const {selectedUserId} = payload;
            return {
                ...state,
                selectedUserId
            }
        }
        case SET_TODO_LIST: {
            const {todoList} = payload;
            return {
                ...state,
                todoList,
            }
        }
        case ADD_USER: {
            const {user} = payload;
            return {
                ...state,
                userList: [...state.userList, user],
            };
        }
        case REMOVE_USER: {
            const {userId} = payload;
            return {
                ...state,
                userList: state.userList.filter(({_id}) => _id !== userId),
            }
        }
        case ADD_TODO_ITEM: {
            const {todoItem} = payload;
            return {
                ...state,
                todoList: [...state.todoList, todoItem],
            }
        }
        case SET_TODO_ITEM: {
            const {todoItem} = payload;
            return {
                ...state,
                todoList: state.todoList.map((item) => item._id === todoItem._id ? todoItem : item)
            }
        }
        case TOGGLE_TODO_ITEM: {
            const {todoItemId} = payload;
            return {
                ...state,
                todoList: state.todoList.map((todoItem) => todoItem._id === todoItemId ? {...todoItem,edit:!todoItem.edit } : todoItem)
            }
        }
        case SET_TODO_FILTER: {
            const {filter} = payload;
            return {
                ...state,
                filter,
            }
        }
        default:
            return state;
    }
}

export default reducer;