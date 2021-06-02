import { UserList, TodoInput, TodoList, TodoCount } from './components/index.js'
import { store } from './modules/index.js'
import { getUser, getUsers } from './modules/user/creator.js'
import TodoConnector from './utils/TodoConnector.js'
import { getFirstUser } from './utils/userUtil.js'

class App {
  constructor() {
    const userListTarget = document.querySelector('#user-list')
    const todoInputTarget = document.querySelector('#todo-input')
    const todoListTarget = document.querySelector('#todo-main')
    const todoCountTarget = document.querySelector('#count-container')

    new UserList(userListTarget)
    new TodoInput(todoInputTarget)
    new TodoList(todoListTarget)
    new TodoCount(todoCountTarget)

    store.subscribe(() => {
      new UserList(userListTarget)
      new TodoInput(todoInputTarget)
      new TodoList(todoListTarget)
      new TodoCount(todoCountTarget)
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
  }
}

new App()
