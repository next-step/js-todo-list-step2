import { Header, User, TodoInput, TodoList, TodoCount } from './components'
import { httpMethod } from './utils/constants.js'
import fetchManager from "./api/api.js"

export default function App() {
  if (new.target !== App) {
    return new App()
  }

  this.init = async () => {
    const { postTodoItem, onChangeUser, onToggle, onDelete, onEdit } = this
    this.username = 'donguk'
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
      username: this.username,
      selector: '.new-todo',
      postTodoItem
    })

    this.$todoList = new TodoList({
      selector: '.todo-list',
      todos: this.todos,
      username: this.username,
      onToggle,
      onDelete,
      onEdit,
    })

    this.$todoCount = new TodoCount({
      selector: '.count-container',
      totalCount: this.todos.length,
      completedCount: this.todos.filter(({isCompleted}) => isCompleted === true).length
    })

    this.getTodos(this.username)
  }

  this.setState = (todos = []) => {
    this.todos = todos
    this.$todoList.setState(todos)
    this.$todoCount.setState(
      todos.length,
      todos.filter(({isCompleted}) => isCompleted === true).length
    )
  }

  this.onChangeUser = (username) => {
    this.username = username
    this.$user.setState()
    this.getTodos(this.username)
  }

  this.onToggle = async (username, itemId) => {
   try {
     await fetchManager({
       path: `/api/u/${username}/item/${itemId}/toggle`,
       method: httpMethod.PUT
     })
     this.getTodos(username)
   } catch(e) {
     console.error(e)
   }
  }

  this.onDelete = async (username, itemId) => {
    try {
      await fetchManager({
        path: `/api/u/${username}/item/${itemId}`,
        method: httpMethod.DELETE
      })
      this.getTodos(this.username)
    } catch(e) {
      console.error(e)
    }
  }

  this.onEdit = (id, text) => {
    const targetIndex = this.todos.findIndex((todo) => todo.id === id)
    this.todos[targetIndex] = { ...this.todos[targetIndex], text }
    this.setState(this.todos)
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

  this.getTodos = async (username) => {
    try {
      const { todoList } = await fetchManager({
        method: httpMethod.GET,
        path: `/api/u/${username}/item`,
      })
      this.setState(todoList)
    } catch (e) {
      // 해당 유저의 Todo가 하나도 없는 경우도 여기로옴.
      console.error(e)
    }
  }

  this.postTodoItem = async (username, text) => {
    try {
      await fetchManager({
        method: httpMethod.POST,
        path: `/api/u/${username}/item`,
        body: { contents: text }
      })
      this.getTodos(username)
    } catch (e) {
      console.error(e)
    }
  }

  this.init()
}
