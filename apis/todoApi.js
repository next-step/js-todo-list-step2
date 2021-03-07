import defaultApi from './defaultApi.js'

export default {
  getTodoItems: async function (userId) {
    return defaultApi.get({ path: `/api/users/${userId}/items` })
  },
}
