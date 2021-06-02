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
  GET_TODOS,
  PRIORITY_TODO,
  UPDATE_TODO,
} from './todo/actions.js'

const initialState = {
  filted: Filter.ALL,
  users: [],
  seletedUser: {
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
        seletedUser: {
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
        seletedUser: {
          ...payload.user,
        },
      }

    // TODO REDUCER
    case GET_TODOS:
      return {
        ...state,
        seletedUser: {
          ...payload.todoList,
        },
      }

    case ADD_TODO:
      return {
        ...state,
        seletedUser: {
          todoList: [...state.seletedUser.todoList, payload.todo],
        },
      }

    case DELETE_TODO:
      return {
        ...state,
        seletedUser: {
          todoList: state.seletedUser.todoList.filter(
            (todo) => todo.id !== payload.todoId
          ),
        },
      }

    case DELETE_TODOS:
      return {
        ...state,
        seletedUser: {
          todoList: [],
        },
      }

    case UPDATE_TODO:
      return {
        ...state,
        seletedUser: {
          todoList: updateTodoState(state, payload, TODO_STATE.CONTENTS),
        },
      }

    case PRIORITY_TODO:
      return {
        ...state,
        seletedUser: {
          todoList: updateTodoState(state, payload, TODO_STATE.PRIORITY),
        },
      }

    case TOGGLE_TODO:
      return {
        ...state,
        seletedUser: {
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
  const todoList = state.seletedUser.todoList
  return todoList.map((todo) =>
    todo.id === payload.itemId
      ? { ...todo, [updateState]: payload[updateState] }
      : todo
  )
}

export default reducer
