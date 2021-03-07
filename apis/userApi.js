import defaultApi from './defaultApi.js'

export default {
  getUsers: function () {
    return defaultApi.get({ path: '/api/users' })
  },

  createUser: function (userName) {
    return defaultApi.post({ path: '/api/users', data: { name: userName } })
  },

  deleteUser: function (userId) {
    return defaultApi.delete({ path: `/api/users/${userId}` })
  },
}
