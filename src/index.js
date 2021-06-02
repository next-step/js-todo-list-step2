import {
  UserList,
  TodoInput,
  TodoList,
  TodoCount,
  Loading,
} from './components/index.js'
import { store } from './modules/index.js'
import {
  getUser,
  getUsers,
  loadingEnd,
  loadingStart,
} from './modules/user/creator.js'
import TodoConnector from './utils/TodoConnector.js'
import { getFirstUser } from './utils/userUtil.js'

class App {
  constructor() {
    const userListTarget = document.querySelector('#user-list')
    const todoInputTarget = document.querySelector('#todo-input')
    const todoListTarget = document.querySelector('#todo-main')
    const todoCountTarget = document.querySelector('#count-container')
    const loadingTarget = document.querySelector('#loading')

    new UserList(userListTarget)
    new TodoInput(todoInputTarget)
    new TodoList(todoListTarget)
    new TodoCount(todoCountTarget)
    new Loading(loadingTarget)

    store.subscribe(() => {
      new UserList(userListTarget)
      new TodoInput(todoInputTarget)
      new TodoList(todoListTarget)
      new TodoCount(todoCountTarget)
      new Loading(loadingTarget)
    })

    this.fetchUsers()
  }

  async fetchUsers() {
    store.dispatch(loadingStart())
    const users = await TodoConnector.getUsers()
    store.dispatch(getUsers(users))
    const firstUser = getFirstUser(users)

    if (!firstUser) {
      return
    }

    const user = await TodoConnector.getUser(firstUser._id)
    store.dispatch(getUser(user))
    store.dispatch(loadingEnd())
  }
}

new App()
