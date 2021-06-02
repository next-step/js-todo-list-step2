import {
  GET_USERS,
  CREATE_USER,
  GET_USER,
  DELETE_USER,
  LOADING_START,
  LOADING_END,
} from './user/actions.js'
import Filter from '../constants/TodoFilter.js'
import TODO_STATE from '../constants/TodoState.js'
import {
  ADD_TODO,
  CHANGE_FILTER,
  DELETE_TODO,
  DELETE_TODOS,
  EDITING_TODO,
  GET_TODOS,
  PRIORITY_TODO,
  TOGGLE_TODO,
  UPDATE_TODO,
} from './todo/actions.js'

const initialState = {
  filter: Filter.ALL,
  users: [],
  selectedUser: {
    _id: '',
    name: '',
    todoList: [],
  },
  seletedAllTodos: [],
  loading: false,
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    // USER REDUCER
    case GET_USERS:
      return {
        ...state,
        ...payload,
      }

    case GET_USER:
      return {
        ...state,
        selectedUser: {
          ...state.selectedUser,
          ...payload.user,
        },
        seletedAllTodos: [...payload.user.todoList],
      }

    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== payload.userId),
      }

    case CREATE_USER:
      return {
        ...state,
        users: [
          ...state.users,
          {
            ...payload.user,
          },
        ],
        selectedUser: {
          ...state.selectedUser,
          ...payload.user,
        },
      }

    // TODO REDUCER
    case GET_TODOS:
      return {
        ...state,
        selectedUser: {
          ...state.selectedUser,
          ...payload.todoList,
        },
        seletedAllTodos: [...payload.todoList],
      }

    case ADD_TODO:
      return {
        ...state,
        selectedUser: {
          ...state.selectedUser,
          todoList: [...state.selectedUser.todoList, payload.todo],
        },
        seletedAllTodos: [...state.seletedAllTodos, payload.todo],
      }

    case DELETE_TODO:
      return {
        ...state,
        selectedUser: {
          ...state.selectedUser,
          todoList: state.selectedUser.todoList.filter(
            (todo) => todo._id !== payload.itemId
          ),
        },
        seletedAllTodos: state.seletedAllTodos.filter(
          (todo) => todo._id !== payload.itemId
        ),
      }

    case DELETE_TODOS:
      return {
        ...state,
        selectedUser: {
          ...state.selectedUser,
          todoList: [],
        },
        seletedAllTodos: [],
      }

    case EDITING_TODO:
      return {
        ...state,
        selectedUser: {
          ...state.selectedUser,
          todoList: updateTodoState(state, payload, TODO_STATE.EDITING),
        },
        seletedAllTodos: updateAllTodoState(state, payload, TODO_STATE.EDITING),
      }

    case UPDATE_TODO:
      return {
        ...state,
        selectedUser: {
          ...state.selectedUser,
          todoList: updateTodoState(state, payload, TODO_STATE.CONTENTS),
        },
        seletedAllTodos: updateAllTodoState(
          state,
          payload,
          TODO_STATE.CONTENTS
        ),
      }

    case PRIORITY_TODO:
      return {
        ...state,
        selectedUser: {
          ...state.selectedUser,
          todoList: updateTodoState(state, payload, TODO_STATE.PRIORITY),
        },
        seletedAllTodos: updateAllTodoState(
          state,
          payload,
          TODO_STATE.PRIORITY
        ),
      }

    case TOGGLE_TODO:
      return {
        ...state,
        selectedUser: {
          ...state.selectedUser,
          todoList: updateTodoState(state, payload, TODO_STATE.ISCOMPLETED),
        },
        seletedAllTodos: updateAllTodoState(
          state,
          payload,
          TODO_STATE.ISCOMPLETED
        ),
      }

    case CHANGE_FILTER:
      return {
        ...state,
        selectedUser: {
          ...state.selectedUser,
          todoList: getFilteredList(state, payload.filter),
        },
        filter: payload.filter,
      }

    case LOADING_START:
      return {
        ...state,
        loading: payload.loading,
      }

    case LOADING_END:
      return {
        ...state,
        loading: payload.loading,
      }

    default:
      return {
        ...state,
      }
  }
}

function getFilteredList(state, filter) {
  const todoList = state.seletedAllTodos

  if (filter === Filter.ACTIVE) {
    return todoList.filter((todo) => todo.isCompleted === false)
  }

  if (filter === Filter.COMPLETE) {
    return todoList.filter((todo) => todo.isCompleted === true)
  }

  return todoList
}

function updateTodoState(state, payload, updateState) {
  const todoList = state.selectedUser.todoList

  return todoList.map((todo) =>
    todo._id === payload.itemId
      ? { ...todo, [updateState]: payload[updateState] }
      : todo
  )
}

function updateAllTodoState(state, payload, updateState) {
  const todoList = state.seletedAllTodos

  return todoList.map((todo) =>
    todo._id === payload.itemId
      ? { ...todo, [updateState]: payload[updateState] }
      : todo
  )
}

export default reducer
