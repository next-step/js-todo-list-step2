import defaultApi from './defaultApi.js'

export default {
  getTodoItems: async function (userId) {
    return defaultApi.get({ path: `/api/users/${userId}/items` })
  },

  createTodoItem: async function (userId, contents) {
    return defaultApi.post({
      path: `/api/users/${userId}/items`,
      data: { contents },
    })
  },

  toggleTodoItem: async function (userId, todoItemId) {
    return defaultApi.put({
      path: `/api/users/${userId}/items/${todoItemId}/toggle`,
    })
  },

  deleteTodoItem: async function (userId, todoItemId) {
    return defaultApi.delete({
      path: `/api/users/${userId}/items/${todoItemId}`,
    })
  },

  editTodoItem: async function (userId, todoItemId, contents) {
    return defaultApi.put({
      path: `/api/users/${userId}/items/${todoItemId}`,
      data: {
        contents,
      },
    })
  },
}
