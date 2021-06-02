import { store } from '../modules/index.js'

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

export { validationTodo, getSelectedTodos }
