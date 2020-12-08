import { createAsyncActionTypes, createAsyncActions } from "../../helper/reduxHelper.js";

const CHANGE_FILTER = "CHANGE_FILTER";

const FETCH_GET_USERS = createAsyncActionTypes("FETCH_GET_USERS");
const FETCH_GET_USER = createAsyncActionTypes("FETCH_GET_USER");
const FETCH_ADD_USER = createAsyncActionTypes("FETCH_ADD_USER");
const FETCH_DELETE_USER = createAsyncActionTypes("FETCH_DELETE_USER");

const FETCH_ADD_USER_TODO_ITEM = createAsyncActionTypes("FETCH_ADD_USER_TODO");
const FETCH_DELETE_USER_TODO_ITEMS = createAsyncActionTypes("FETCH_DELETE_USER_TODO_ITEMS");
const FETCH_DELETE_USER_TODO_ITEM = createAsyncActionTypes("FETCH_DELETE_USER_TODO_ITEM");
const FETCH_MODIFY_USER_TODO_ITEM = createAsyncActionTypes("FETCH_MODIFY_USER_TODO_ITEM");
const SET_PRIORITY_USER_TODO_ITEM = createAsyncActionTypes("SET_PRIORITY_USER_TODO_ITEM");
const FETCH_TOGGLE_USER_TODO_ITEM = createAsyncActionTypes("FETCH_TOGGLE_USER_TODO_ITEM");

const changeFilter = (filtered) => {
    return {
        type: CHANGE_FILTER,
        payload: {
            filtered
        }
    }
};

const fetchGetUsers = createAsyncActions(FETCH_GET_USERS);
const fetchGetUser = createAsyncActions(FETCH_GET_USER);
const fetchAddUser = createAsyncActions(FETCH_ADD_USER);
const fetchDeleteUser = createAsyncActions(FETCH_DELETE_USER);

const fetchAddUserTodoItem = createAsyncActions(FETCH_ADD_USER_TODO_ITEM);
const fetchDeleteUserTodoItems = createAsyncActions(FETCH_DELETE_USER_TODO_ITEMS);
const fetchDeleteUserTodoItem = createAsyncActions(FETCH_DELETE_USER_TODO_ITEM);
const fetchModifyUserTodoItem = createAsyncActions(FETCH_MODIFY_USER_TODO_ITEM);
const setPriorityUserTodoItem = createAsyncActions(SET_PRIORITY_USER_TODO_ITEM);
const fetchToggleUserTodoItem = createAsyncActions(FETCH_TOGGLE_USER_TODO_ITEM);

export {
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

    changeFilter,

    fetchGetUsers,
    fetchGetUser,
    fetchAddUser,
    fetchDeleteUser,

    fetchAddUserTodoItem,
    fetchDeleteUserTodoItems,
    fetchDeleteUserTodoItem,
    setPriorityUserTodoItem,
    fetchModifyUserTodoItem,
    fetchToggleUserTodoItem,
}