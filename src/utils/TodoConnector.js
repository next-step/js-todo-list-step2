import baseUrl from '../configs/baseUrl.js'
import HttpConnector from '../core/HttpConnector.js'

const todoConnector = new HttpConnector({ url: baseUrl + '/api/users' })

const userIDUrl = (userId) => `/${userId}`
const userItemsUrl = (userId) => `/${userId}/items`
const userItemUrl = (userId, itemId) => `/${userId}/items/${itemId}`

export default Object.freeze({
  getUsers() {
    return todoConnector.get('')
  },

  createUser(name) {
    return todoConnector.post('', { name })
  },

  getUser(userId) {
    return todoConnector.get(userIDUrl(userId))
  },

  deleteUser(userId) {
    return todoConnector.delete(userIDUrl(userId))
  },

  getUserItems(userId) {
    return todoConnector.get(userItemsUrl(userId))
  },

  addTodoItem(userId, contents) {
    return todoConnector.post(userItemsUrl(userId), { contents })
  },

  deleteAllTodoItems(userId) {
    return todoConnector.delete(userItemsUrl(userId))
  },

  deleteTodoItem(userId, itemId) {
    return todoConnector.delete(userItemUrl(userId, itemId))
  },

  updateTodoItem(userId, itemId, contents) {
    return todoConnector.put(userItemUrl(userId, itemId), { contents })
  },

  updatePriority(userId, itemId, priority) {
    return todoConnector.put(userItemUrl(userId, itemId) + '/priority', {
      priority,
    })
  },

  toggleTodoItem(userId, itemId) {
    return todoConnector.put(userItemUrl(userId, itemId) + '/toggle')
  },
})
