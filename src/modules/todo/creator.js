import {
  ADD_TODO,
  DELETE_TODO,
  DELETE_TODOS,
  EDITING_TODO,
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

const deleteTodo = (itemId) => {
  return {
    type: DELETE_TODO,
    payload: { itemId },
  }
}

const editingTodo = (itemId, editing) => {
  return {
    type: EDITING_TODO,
    payload: { itemId, editing },
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

const toggleTodo = (itemId, isCompleted) => {
  return {
    type: TOGGLE_TODO,
    payload: { itemId, isCompleted },
  }
}

export {
  getTodos,
  addTodo,
  deleteTodos,
  deleteTodo,
  editingTodo,
  updateTodo,
  priorityTodo,
  toggleTodo,
}
