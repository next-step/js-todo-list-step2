const END_POINT = 'https://js-todo-list-9ca3a.df.r.appspot.com'

const defaultApi = {
  get: async function ({ path }) {
    const res = await fetch(`${END_POINT}${path}`)
    return await res.json()
  },

  post: async function ({ path, data }) {
    const res = await fetch(`${END_POINT}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return await res.json()
  },

  delete: async function ({ path }) {
    const res = await fetch(`${END_POINT}${path}`, {
      method: 'DELETE',
    })
    return await res.json()
  },
}

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
