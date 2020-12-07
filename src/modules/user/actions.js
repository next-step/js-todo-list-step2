import { createAsyncActionTypes, createAsyncActions } from "../../helper/reduxHelper.js";

const FETCH_GET_USERS = createAsyncActionTypes("FETCH_GET_USERS");
const FETCH_GET_USER = createAsyncActionTypes("FETCH_GET_USER");
const FETCH_ADD_USER = createAsyncActionTypes("FETCH_ADD_USER");
const FETCH_DELETE_USER = createAsyncActionTypes("FETCH_DELETE_USER");

const fetchGetUsers = createAsyncActions(FETCH_GET_USERS);
const fetchGetUser = createAsyncActions(FETCH_GET_USER);
const fetchAddUser = createAsyncActions(FETCH_ADD_USER);
const fetchDeleteUser = createAsyncActions(FETCH_DELETE_USER);

export {
    FETCH_GET_USERS,
    FETCH_GET_USER,
    FETCH_ADD_USER,
    FETCH_DELETE_USER,
    fetchGetUsers,
    fetchGetUser,
    fetchAddUser,
    fetchDeleteUser,
}