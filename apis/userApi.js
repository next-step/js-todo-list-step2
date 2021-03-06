const END_POINT = 'https://js-todo-list-9ca3a.df.r.appspot.com'

const defaultApi = {
  get: async function ({ path }) {
    const res = await fetch(`${END_POINT}${path}`)
    return await res.json()
  },
}

export default {
  getUsers: function () {
    return defaultApi.get({ path: '/api/users' })
  },
}
