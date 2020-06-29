import TodoInput from './TodoInput.js'
import TodoList from './TodoList.js'
import TodoCount from './TodoCount.js'
import TodoStatus from './TodoStatus.js'
import { todoStatus, USERNAME } from '../utils/constant.js'
import TodoDeleteAll from './TodoDeleteAll.js'
import {
  getTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
  deleteAllTodo,
  changeTodo,
  getUsers,
} from '../api/api.js'
import TodoUserList from './TodoUserList.js'
import TodoAppTitle from './TodoAppTitle.js'

export default function TodoApp() {
  const onAddTodo = async (text) => {
    await addTodo(this.username, { contents: text })
    this.setState(this.username)
  }

  const findTodoIdByStatus = (index) => {
    let id = null

    switch (this.todoViewStatus) {
      case todoStatus.ALL:
        id = this.todos[index]._id
        break

      case todoStatus.ACTIVE:
      case todoStatus.COMPLETED:
        const findIdx = this.todos.findIndex(
          (todo) => todo.contents === this.filteredTodos[index].contents
        )
        if (findIdx !== -1) {
          id = this.todos[findIdx]._id
        }
        break
    }
    return id
  }

  const onToggleTodo = async (index) => {
    const id = findTodoIdByStatus(index)
    if (id === null) {
      return
    }
    await toggleTodo(this.username, id)
    this.todos[index].isCompleted = !this.todos[index].isCompleted
    this.setState(this.username)
  }

  const onDeleteTodo = async (index) => {
    const id = findTodoIdByStatus(index)
    if (id === null) {
      return
    }
    await deleteTodo(this.username, id)
    this.todos.splice(index, 1)
    this.setState(this.username)
  }

  const onChangeTodo = async (text, index) => {
    const id = findTodoIdByStatus(index)
    if (id === null) {
      return
    }
    await changeTodo(this.username, id, { contents: text })
    this.todos[index].contents = text
    this.setState(this.username)
  }

  const onDeleteAll = async () => {
    this.todoViewStatus = todoStatus.DELETEALL
    await deleteAllTodo(this.username)
    this.setState(this.username)
  }

  const onSetActiveUser = (user) => {
    this.username = user
    this.setState(this.username)
  }

  const getTodoUserList = async () => {
    const userList = await getUsers()
    return userList.map((user) => user.name)
  }

  const filteredTodosByStatus = (todos, status) => {
    let filteredTodos = []

    switch (status) {
      case todoStatus.ALL:
        filteredTodos = todos
        break

      case todoStatus.ACTIVE:
        filteredTodos = todos.filter((todo) => todo.isCompleted === false)
        break

      case todoStatus.COMPLETED:
        filteredTodos = todos.filter((todo) => todo.isCompleted === true)
        break

      case todoStatus.DELETEALL:
        filteredTodos = []
        this.todoViewStatus = todoStatus.ALL
        break
    }
    return filteredTodos
  }

  const onSetTodoStatus = (status) => {
    this.todoViewStatus = status
    this.setState(this.username)
  }

  this.setState = async function (username) {
    this.username = username

    const { todoList } = await getTodos(this.username)
    this.todos = todoList

    this.filteredTodos = filteredTodosByStatus(this.todos, this.todoViewStatus)
    this.todoList.setState(this.filteredTodos)
    this.todoCount.setState(this.filteredTodos)
    this.todoUserList.setState(this.username)
    this.todoAppTitle.setState(this.username)
  }

  this.init = async function () {
    this.username = USERNAME

    this.todos = []
    this.filteredTodos = []
    this.todoViewStatus = todoStatus.ALL

    this.todoUserList = await getTodoUserList()

    this.$todoInput = document.querySelector('.new-todo')
    this.$todoList = document.querySelector('.todo-list')
    this.$todoCount = document.querySelector('.todo-count > strong')
    this.$todoStatus = document.querySelector('.filters')
    this.$todoDeleteAll = document.querySelector('.clear-completed')
    this.$todoUserList = document.querySelector('#user-list')
    this.$todoAppTitle = document.querySelector('#user-title')

    try {
      this.todoInput = new TodoInput({
        $target: this.$todoInput,
        onAddTodo: onAddTodo,
      })

      this.todoList = new TodoList({
        data: this.todos,
        $target: this.$todoList,
        onToggleTodo,
        onDeleteTodo,
        onChangeTodo,
      })

      this.todoCount = new TodoCount({
        data: this.todos,
        $target: this.$todoCount,
      })

      this.todoStatus = new TodoStatus({
        $target: this.$todoStatus,
        onSetTodoStatus,
      })

      this.todoDeleteAll = new TodoDeleteAll({
        $target: this.$todoDeleteAll,
        onDeleteAll,
      })

      this.todoUserList = new TodoUserList({
        $target: this.$todoUserList,
        todoUserList: this.todoUserList,
        activeUser: this.username,
        onSetActiveUser,
      })

      this.todoAppTitle = new TodoAppTitle({
        $target: this.$todoAppTitle,
        username: this.username,
      })
    } catch (err) {
      console.log(err)
    }
    this.setState(this.username)
  }

  this.init()
}
