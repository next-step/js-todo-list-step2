import {
  GET_USERS,
  CREATE_USER,
  GET_USER,
  DELETE_USER,
} from './user/actions.js'
import Filter from '../constants/TodoFilter.js'
import TODO_STATE from '../constants/TodoState.js'
import {
  ADD_TODO,
  DELETE_TODO,
  DELETE_TODOS,
  EDITING_TODO,
  GET_TODOS,
  PRIORITY_TODO,
  TOGGLE_TODO,
  UPDATE_TODO,
} from './todo/actions.js'

const initialState = {
  filted: Filter.ALL,
  users: [],
  selectedUser: {
    _id: '',
    name: '',
    todoList: [],
  },
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
      }

    case ADD_TODO:
      return {
        ...state,
        selectedUser: {
          ...state.selectedUser,
          todoList: [...state.selectedUser.todoList, payload.todo],
        },
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
      }

    case DELETE_TODOS:
      return {
        ...state,
        selectedUser: {
          ...state.selectedUser,
          todoList: [],
        },
      }

    case EDITING_TODO:
      return {
        ...state,
        selectedUser: {
          ...state.selectedUser,
          todoList: updateTodoState(state, payload, TODO_STATE.EDITING),
        },
      }

    case UPDATE_TODO:
      return {
        ...state,
        selectedUser: {
          ...state.selectedUser,
          todoList: updateTodoState(state, payload, TODO_STATE.CONTENTS),
        },
      }

    case PRIORITY_TODO:
      return {
        ...state,
        selectedUser: {
          ...state.selectedUser,
          todoList: updateTodoState(state, payload, TODO_STATE.PRIORITY),
        },
      }

    case TOGGLE_TODO:
      return {
        ...state,
        selectedUser: {
          ...state.selectedUser,
          todoList: updateTodoState(state, payload, TODO_STATE.ISCOMPLETED),
        },
      }

    default:
      return {
        ...state,
      }
  }
}

function updateTodoState(state, payload, updateState) {
  const todoList = state.selectedUser.todoList

  return todoList.map((todo) =>
    todo._id === payload.itemId
      ? { ...todo, [updateState]: payload[updateState] }
      : todo
  )
}

export default reducer
