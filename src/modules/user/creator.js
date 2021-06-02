import {
  CREATE_USER,
  DELETE_USER,
  GET_USER,
  GET_USERS,
  LOADING_START,
  LOADING_END,
} from './actions.js'

const getUsers = (users) => {
  return {
    type: GET_USERS,
    payload: {
      users,
    },
  }
}

const getUser = (user) => {
  return {
    type: GET_USER,
    payload: {
      user,
    },
  }
}

const deleteUser = (userId) => {
  return {
    type: DELETE_USER,
    payload: {
      userId,
    },
  }
}

const createUser = (user) => {
  return {
    type: CREATE_USER,
    payload: {
      user,
    },
  }
}

const loadingStart = () => {
  return {
    type: LOADING_START,
    payload: {
      loading: true,
    },
  }
}

const loadingEnd = () => {
  return {
    type: LOADING_END,
    payload: {
      loading: false,
    },
  }
}

export { getUsers, getUser, deleteUser, createUser, loadingStart, loadingEnd }
