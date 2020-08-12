import { Header, User, TodoInput, TodoList, TodoCount, TodoFilter, Loading } from './components/index.js'
import { FILTER_STATUS, CLASS_NAME } from './utils/constants.js'
import api from './api/api.js'

const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms))

const getTodoHash = (todos) => {
  return {
    [FILTER_STATUS.ALL]: todos,
    [FILTER_STATUS.ACTIVE]: todos.filter(({isCompleted}) => !isCompleted),
    [FILTER_STATUS.COMPLETED]: todos.filter(({isCompleted}) => isCompleted)
  }
}

export default function App() {
  if (new.target !== App) {
    return new App()
  }

  this.init = async () => {
    const { getTodos, onChangeUser, onFilter } = this
    this.username = 'donguk3'
    this.todos = []
    this.todoHash = {
      [FILTER_STATUS.ALL]: this.todos,
      [FILTER_STATUS.ACTIVE]: [],
      [FILTER_STATUS.COMPLETED]: []
    }
    this.filterStatus = FILTER_STATUS.ALL

    this.$header = new Header({
      selector: '#user-title',
      username: this.username
    })

    this.$user = new User({
      selector: '#user-list',
      currentUser: this.username,
      onChangeUser,
    })

    this.$todoInput = new TodoInput({
      selector: '.new-todo',
      username: this.username,
      getTodos
    })

    this.$todoList = new TodoList({
      selector: '.todo-list',
      todos: this.todos,
      username: this.username,
      getTodos,
    })

    this.$todoCount = new TodoCount({
      selector: '.todo-counter',
      totalCount: this.todos.length,
      completedCount: this.todos.filter(({isCompleted}) => isCompleted).length
    })

    new TodoFilter({
      selector: '.filters',
      onFilter
    })

    this.$loading = new Loading({
      selector: '.todo-list'
    })

    this.$removeAllBtn = document.querySelector(`.${CLASS_NAME.REMOVE_ALL}`)
    this.$removeAllBtn.addEventListener('click', this.onDeleteAll)

    this.getTodos()
  }

  this.onFilter = (status) => {
    this.filterStatus = status
    this.setState()
  }

  this.setState = () => {
    const renderTodos = this.todoHash[this.filterStatus]
    this.$todoList.setState(this.username, renderTodos)
    this.$todoCount.setState(
      renderTodos.length,
      renderTodos.filter(({isCompleted}) => isCompleted === true).length
    )
  }

  this.getTodos = async () => {
    this.$loading.render() // loading on
    // await delay(500) // delay 주고 싶다면 추가
    try {
      const { todoList } = await api.getTodos(this.username)
      this.todos = todoList ? todoList : []
      this.todoHash = getTodoHash(this.todos)
      this.setState()
    } catch (e) {
      console.error(e)
      this.todos = [] // 없는 유저인 경우
      this.setState()
    }
  }

  this.onChangeUser = (username) => {
    this.username = username
    this.$header.setState(username)
    this.$user.setState()
    this.$todoInput.setState(username)
    this.$todoList.setState(username)
    this.getTodos()
  }

  this.onDeleteAll = async () => {
    try {
      await api.deleteTodoAll(this.username)
      this.getTodos()
    } catch (e) {
      console.error(e)
    }
  }

  this.init()
}
