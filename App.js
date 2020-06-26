import { Header, User, TodoInput, TodoList, TodoCount, Loading } from './components'
import { httpMethod } from './utils/constants.js'
import fetchManager from "./api/api.js"

const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms))

export default function App() {
  if (new.target !== App) {
    return new App()
  }

  this.init = async () => {
    const { postTodoItem, onChangeUser, onToggle, onDelete, onEdit } = this
    this.username = '동욱'
    this.todos = []
    this.users = await this.getUsers()

    this.$header = new Header({
      selector: '#user-title',
      username: this.username
    })

    this.$user = new User({
      selector: '#user-list',
      currentUser: this.username,
      users: this.users,
      onChangeUser,
    })

    new TodoInput({
      selector: '.new-todo',
      postTodoItem
    })

    this.$todoList = new TodoList({
      selector: '.todo-list',
      todos: this.todos,
      onToggle,
      onDelete,
      onEdit,
    })

    this.$todoCount = new TodoCount({
      selector: '.count-container',
      totalCount: this.todos.length,
      completedCount: this.todos.filter(({isCompleted}) => isCompleted === true).length
    })

    this.$loading = new Loading({ selector: '.todo-list' })

    this.getTodos()
  }

  this.setState = () => {
    this.$todoList.setState(this.username, this.todos)
    this.$todoCount.setState(
      this.todos.length,
      this.todos.filter(({isCompleted}) => isCompleted === true).length
    )
  }

  this.getUsers = async () => {
    try {
      return await fetchManager({
        method: httpMethod.GET,
        path: '/api/u'
      })
    } catch (e) {
      console.error(e)
    }
  }

  this.getTodos = async () => {
    this.$loading.render() // loading on
    // await delay(500) // delay 주고 싶다면 추가
    try {
      const { todoList } = await fetchManager({
        method: httpMethod.GET,
        path: `/api/u/${this.username}/item`,
      })
      this.todos = todoList
      this.setState()
    } catch (e) {
      console.error(e)
    }
  }

  this.onChangeUser = (username) => {
    this.username = username
    this.$header.setState(username)
    this.$user.setState()
    this.getTodos()
  }

  this.onToggle = async (itemId) => {
   try {
     await fetchManager({
       method: httpMethod.PUT,
       path: `/api/u/${this.username}/item/${itemId}/toggle`,
     })
     this.getTodos()
   } catch(e) {
     console.error(e)
   }
  }

  this.onDelete = async (itemId) => {
    try {
      await fetchManager({
        method: httpMethod.DELETE,
        path: `/api/u/${this.username}/item/${itemId}`,
      })
      this.getTodos()
    } catch(e) {
      console.error(e)
    }
  }

  this.onEdit = async (itemId, contents) => {
    try {
      await fetchManager({
        method: httpMethod.PUT,
        path: `/api/u/${this.username}/item/${itemId}`,
        body: { contents }
      })
      this.getTodos()
    } catch (e) {
      console.error(e)
    }
  }

  this.postTodoItem = async (text) => {
    try {
      await fetchManager({
        method: httpMethod.POST,
        path: `/api/u/${this.username}/item`,
        body: { contents: text }
      })
      this.getTodos()
    } catch (e) {
      console.error(e)
    }
  }

  this.init()
}
