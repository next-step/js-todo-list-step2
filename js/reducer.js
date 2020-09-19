import {FAILURE, SUCCESS} from './constant.js'
import {actionCreator} from "./redux.js";

const SET_STATUS = 'setStatus';
const SET_USER_LIST = 'setUserList';
const SET_USER_ID = 'setUserId';
const SET_APP = 'setApp';
const SET_TODO_LIST = 'setTodoList';

export const setStatus = ({status}) => actionCreator(SET_STATUS,{status});
export const setUserList = ({userList, selectedUserId}) => actionCreator(SET_USER_LIST,{userList, selectedUserId});
export const setApp = ({userList, selectedUserId, todoList}) => actionCreator(SET_APP,{userList, selectedUserId, todoList});
export const setUserId = ({selectedUserId}) => actionCreator(SET_USER_ID, {selectedUserId});
export const setTodoList = ({todoList}) => actionCreator(SET_TODO_LIST, {todoList});

const initState = {
	status: FAILURE,
	userList: [],
	todoList:[],
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
		default:
			return state;
	}
}

export default reducer;