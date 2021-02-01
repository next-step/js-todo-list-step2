import {
    CHANGE_FILTER,

    FETCH_GET_USERS,
    FETCH_GET_USER,
    FETCH_ADD_USER,
    FETCH_DELETE_USER,

    FETCH_ADD_USER_TODO_ITEM,
    FETCH_DELETE_USER_TODO_ITEMS,
    FETCH_DELETE_USER_TODO_ITEM,
    FETCH_MODIFY_USER_TODO_ITEM,
    SET_PRIORITY_USER_TODO_ITEM,
    FETCH_TOGGLE_USER_TODO_ITEM,

} from "./actions.js";

const initialState = {
    filtered: "all",
    users: [],
    selectedUser: {
        _id: "",
        name: "",
        todoList: []
    },
    loading: false,
    error: "",
};

/* TODO: 중복 코드 해결하는 우아한 방법 생각하기 */
const users = (state = initialState, { type, payload }) => {
    switch (type) {
        case CHANGE_FILTER:
            return {
                ...state,
                filtered: payload.filtered,
            };
        case FETCH_GET_USERS.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_GET_USERS.SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
            };
        case FETCH_GET_USERS.FAILURE:
            return {
                ...state,
                loading: false,
                error: payload.error,
            };
        case FETCH_GET_USER.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_GET_USER.SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
            };
        case FETCH_GET_USER.FAILURE:
            return {
                ...state,
                loading: false,
                error: payload.error,
            };
        case FETCH_ADD_USER.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_ADD_USER.SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
            };
        case FETCH_ADD_USER.FAILURE:
            return {
                ...state,
                loading: false,
                error: payload.error,
            };
        case FETCH_ADD_USER_TODO_ITEM.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_ADD_USER_TODO_ITEM.SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
            };
        case FETCH_ADD_USER_TODO_ITEM.FAILURE:
            return {
                ...state,
                loading: false,
                error: payload.error,
            };
        case FETCH_DELETE_USER_TODO_ITEMS.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_DELETE_USER_TODO_ITEMS.SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
            };
        case FETCH_DELETE_USER_TODO_ITEMS.FAILURE:
            return {
                ...state,
                loading: false,
                error: payload.error,
            };
        case FETCH_DELETE_USER_TODO_ITEM.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_DELETE_USER_TODO_ITEM.SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
            };
        case FETCH_DELETE_USER_TODO_ITEM.FAILURE:
            return {
                ...state,
                loading: false,
                error: payload.error,
            };
        case FETCH_MODIFY_USER_TODO_ITEM.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_MODIFY_USER_TODO_ITEM.SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
            };
        case FETCH_MODIFY_USER_TODO_ITEM.FAILURE:
            return {
                ...state,
                loading: false,
                error: payload.error,
            };
        case SET_PRIORITY_USER_TODO_ITEM.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SET_PRIORITY_USER_TODO_ITEM.SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
            };
        case SET_PRIORITY_USER_TODO_ITEM.FAILURE:
            return {
                ...state,
                loading: false,
                error: payload.error,
            };
        case FETCH_TOGGLE_USER_TODO_ITEM.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_TOGGLE_USER_TODO_ITEM.SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
            };
        case FETCH_TOGGLE_USER_TODO_ITEM.FAILURE:
            return {
                ...state,
                loading: false,
                error: payload.error,
            };
        default:
            return {...state}
    }
};

export default users;
