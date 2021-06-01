import {
  ADD_TODO,
  DELETE_TODO,
  DELETE_TODOS,
  GET_TODOS,
  PRIORITY_TODO,
  TOGGLE_TODO,
  UPDATE_TODO,
} from './actions.js'

const getTodos = (todoList) => {
  return {
    type: GET_TODOS,
    payload: {
      todoList,
    },
  }
}

const addTodo = (todo) => {
  return {
    type: ADD_TODO,
    payload: {
      todo,
    },
  }
}

const deleteTodos = (todoId) => {
  return {
    type: DELETE_TODOS,
    payload: {
      todoId,
    },
  }
}

const deleteTodo = (userId, itemId) => {
  return {
    type: DELETE_TODO,
    payload: { userId, itemId },
  }
}

const updateTodo = (itemId, contents) => {
  return {
    type: UPDATE_TODO,
    payload: { itemId, contents },
  }
}

const priorityTodo = (itemId, priority) => {
  return {
    type: PRIORITY_TODO,
    payload: { itemId, priority },
  }
}

const toggleTodo = (userId, itemId) => {
  return {
    type: TOGGLE_TODO,
    payload: { userId, itemId },
  }
}

export {
  getTodos,
  addTodo,
  deleteTodos,
  deleteTodo,
  updateTodo,
  priorityTodo,
  toggleTodo,
}
