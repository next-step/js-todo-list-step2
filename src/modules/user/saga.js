import { take, select, call, put, fork, takeEvery, runSaga } from "../../core/redux-saga/index.js";
import TodoConnector from "../../connectors/TodoConnector.js";
import {
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
} from "./actions.js";

function* getUsers(action) {
    try {
        const users = yield call(TodoConnector.getUsers);
        yield put(fetchGetUsers.SUCCESS({ users }));
    } catch (error) {
        yield put(fetchGetUsers.FAILURE({ error }));
    }
}

function* watchGetUsers() {
    yield* takeEvery(FETCH_GET_USERS.REQUEST, getUsers)
}

function* getSelectedUser({ type, payload }) {
    try {
        const selectedUser = yield call(TodoConnector.getUser, payload.userId);
        yield put(fetchGetUser.SUCCESS({ selectedUser }));
    } catch (error) {
        yield put(fetchGetUsers.FAILURE({ error }));
    }
}

function* watchGetSelectedUser() {
    yield* takeEvery(FETCH_GET_USER.REQUEST, getSelectedUser)
}

function* createUser({ type, payload }) {
    try {
        const response = yield call(TodoConnector.addUser, payload.userName);
        yield put(fetchAddUser.SUCCESS());
        alert("성공적으로 추가되었습니다!");
        yield put(fetchGetUsers.REQUEST());
    } catch (error) {
        yield put(fetchAddUser.FAILURE( { error }))
    }
}

function* watchCreateUser() {
    yield* takeEvery(FETCH_ADD_USER.REQUEST, createUser)
}

function* addUserTodoItem({ payload }) {
    try {
        yield call(TodoConnector.addUserTodoItems, payload.userId, payload.content);
        yield put(fetchAddUserTodoItem.SUCCESS());
        yield put(fetchGetUser.REQUEST({ userId: payload.userId }));
    } catch (error) {
        yield put(fetchAddUserTodoItem.FAILURE({ error }))
    }
}

function* watchAddTodoItem() {
    yield* takeEvery(FETCH_ADD_USER_TODO_ITEM.REQUEST, addUserTodoItem);
}

function* changePriorityTodoItem({ payload }) {
    try {
        yield call(TodoConnector.setPriorityUserTodoItem, payload.userId, payload.itemId, payload.priority)
        yield put(setPriorityUserTodoItem.SUCCESS());
        yield put(fetchGetUser.REQUEST({ userId: payload.userId }));
    } catch (error) {
        yield put(setPriorityUserTodoItem.FAILURE({ error }))
    }
}

function* watchSetPriority() {
    yield* takeEvery(SET_PRIORITY_USER_TODO_ITEM.REQUEST, changePriorityTodoItem);
}

function* toggleTodoItem({ payload }) {
    try {
        yield call(TodoConnector.toggleUserTodoItem, payload.userId, payload.itemId);
        yield put(fetchToggleUserTodoItem.SUCCESS());
        yield put(fetchGetUser.REQUEST({ userId: payload.userId }));
    } catch (error) {
        yield put(fetchToggleUserTodoItem.FAILURE({ error }))
    }
}

function* watchToggleTodoItem() {
    yield* takeEvery(FETCH_TOGGLE_USER_TODO_ITEM.REQUEST, toggleTodoItem);
}

function* deleteTodoItem({ payload }) {
    try {
        yield call(TodoConnector.deleteUserTodoItem, payload.userId, payload.itemId);
        yield put(fetchDeleteUserTodoItem.SUCCESS());
        yield put(fetchGetUser.REQUEST({ userId: payload.userId }));
    } catch (error) {
        yield put(fetchDeleteUserTodoItem.FAILURE({ error }))
    }
}

function* watchDeleteTodoItem() {
    yield* takeEvery(FETCH_DELETE_USER_TODO_ITEM.REQUEST, deleteTodoItem);
}

function* deleteAllTodoItems({ payload }) {
    try {
        yield call(TodoConnector.deleteUserTodoItems, payload.userId);
        yield put(fetchDeleteUserTodoItems.SUCCESS());
        yield put(fetchGetUser.REQUEST({ userId: payload.userId }));
    } catch (error) {
        yield put(fetchDeleteUserTodoItems.FAILURE({ error }))
    }
}

function* watchDeleteAllTodoItems() {
    yield* takeEvery(FETCH_DELETE_USER_TODO_ITEMS.REQUEST, deleteAllTodoItems)
}

function* userSaga() {
    yield fork(watchGetUsers);
    yield fork(watchGetSelectedUser);
    yield fork(watchCreateUser);
    yield fork(watchAddTodoItem);
    yield fork(watchSetPriority);
    yield fork(watchToggleTodoItem);
    yield fork(watchDeleteTodoItem);
    yield fork(watchDeleteAllTodoItems);
}

export default userSaga;
