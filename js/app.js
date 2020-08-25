import { USER, KEY, ADDRESS } from './constants.js'
import TodoList from './TodoList.js'
import TodoInput from './TodoInput.js'
import TodoUser from './TodoUser.js'

function App () {
  const $todoInput = document.querySelector('.new-todo')
  const $todoList = document.querySelector('.todo-list')
  const $userTitle = document.querySelector('#user-title')
  const $userList = document.querySelector('#user-list')

  this.userName = USER.NAME

  this.setState = (activeUserName) => {
    this.userName = activeUserName
    todoList.setState(this.userName)
  }

  this.addItem = (text) => {
    todoList.post(text)
  }

  const todoList = new TodoList($todoList, this.userName)
  const todoInput = new TodoInput($todoInput, (text) => { this.addItem(text) })
  const todoUser = new TodoUser($userTitle, $userList, this.userName, (activeUserName) => { this.setState(activeUserName) })
}

new App()
