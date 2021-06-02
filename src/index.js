import { UserList } from './components/index.js'
import { store } from './modules/index.js'
import { getUser, getUsers } from './modules/user/creator.js'
import TodoConnector from './utils/TodoConnector.js'
import { getFirstUser } from './utils/todoUtil.js'

class App {
  constructor() {
    const userListTarget = document.querySelector('#user-list')
    new UserList(userListTarget)

    store.subscribe(() => {
      new UserList(userListTarget)
    })

    this.fetchUsers()
  }

  async fetchUsers() {
    const users = await TodoConnector.getUsers()
    store.dispatch(getUsers(users))
    const firstUser = getFirstUser(users)

    if (!firstUser) {
      return
    }

    const user = await TodoConnector.getUser(firstUser._id)
    store.dispatch(getUser(user))
    console.log(store.getState())
  }
}

new App()
