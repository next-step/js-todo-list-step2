import { store } from '../modules/index.js'
import Filter from '../constants/TodoFilter.js'

const validationTodo = (contents) => {
  return !contents ? false : contents.length >= 2
}

const getSelectedTodos = () => {
  const { selectedUser } = store.getState()

  if (!selectedUser) {
    return []
  }

  return selectedUser.todoList
}

const getSelectedTodoCount = (filter = Filter.ALL) => {
  const { selectedUser } = store.getState()

  if (!selectedUser) {
    return 0
  }
  const todoList = selectedUser.todoList

  if (filter === Filter.ALL) {
    return todoList.length
  }

  if (filter === Filter.ACTIVE) {
    return todoList.reduce((acc, todo) => (acc + todo.isCompleted ? 0 : 1), 0)
  }

  if (filter === Filter.COMPLETE) {
    return todoList.reduce((acc, todo) => (acc + todo.isCompleted ? 1 : 0), 0)
  }

  return 0
}

const getFilter = () => {
  const { filter } = store.getState()

  return filter
}

export { validationTodo, getSelectedTodos, getSelectedTodoCount, getFilter }
