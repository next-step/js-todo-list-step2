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
    this.todos = await this.getTodos(this.username)
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
      selector: '.todo-count',
      count: this.todos.length
    })
  }

  this.setState = (todos = []) => {
    this.$todoList.setState(todos)
    this.$todoCount.setState(todos.length)
  }

  /* Event Handler Function Start */
  this.onChangeUser = (username) => {
    this.username = username
    this.$user.currentUser = username
    this.$user.setState()
    this.getTodos(this.username)
  }

  this.onToggle = (id) => {
    const targetIndex = this.todos.findIndex((todo) => todo.id === id)
    this.todos[targetIndex] = { ...this.todos[targetIndex], isCompleted: !this.todos[targetIndex].isCompleted }
    this.setState(this.todos)
  }

  this.onEdit = (id, text) => {
    const targetIndex = this.todos.findIndex((todo) => todo.id === id)
    this.todos[targetIndex] = { ...this.todos[targetIndex], text }
    this.setState(this.todos)
  }

  this.onDelete = (id) => {
    this.todos = this.todos.filter((todo) => todo.id !== id)
    this.setState(this.todos)
  }
  /* Event Handler Function End */

  /* API Request Function Start */
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
    } catch (e) {
      console.error(e)
    }
  }

  /* API Request Function End */
  this.init()
}
