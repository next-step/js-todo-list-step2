import {
  GET_USERS,
  CREATE_USER,
  GET_USER,
  DELETE_USER,
} from './user/actions.js'
import Filter from '../constants/TodoFilter.js'
import TODO_STATE from '../constants/TodoState.js'
import { GET_TODOS, PRIORITY_TODO, UPDATE_TODO } from './todo/actions.js'

const initialState = {
  filted: Filter.ALL,
  users: [],
  seletedUser: {
    _id: '',
    name: '',
    todolist: [],
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
          ...user,
        },
      }

    case DELETE_USER:
      return {
        ...state,
        users: [...state.users.filter((user) => user.id !== payload.userId)],
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
          ...payload.todolist,
        },
      }

    case ADD_TODO:
      return {
        ...state,
        seletedUser: {
          todolist: [...state.seletedUser.todolist, { ...payload.todo }],
        },
      }

    case DELETE_TODO:
      return {
        ...state,
        seletedUser: {
          todolist: state.seletedUser.todolist.filter(
            (todo) => todo.id !== payload.todoId
          ),
        },
      }

    case DELETE_TODOS:
      return {
        ...state,
        seletedUser: {
          todolist: [],
        },
      }

    case UPDATE_TODO:
      return {
        ...state,
        seletedUser: {
          todolist: updateTodoState(state, payload, TODO_STATE.CONTENTS),
        },
      }

    case PRIORITY_TODO:
      return {
        ...state,
        seletedUser: {
          todolist: updateTodoState(state, payload, TODO_STATE.PRIORITY),
        },
      }

    case TOGGLE_TODO:
      return {
        ...state,
        seletedUser: {
          todolist: updateTodoState(state, payload, TODO_STATE.ISCOMPLETED),
        },
      }
  }
}

function updateTodoState(state, payload, state) {
  const todoList = state.seletedUser.todolist
  return todoList.map((todo) =>
    todo.id === payload.itemId ? { ...todo, [state]: payload[state] } : todo
  )
}

export default reducer
