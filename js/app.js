import TodoList from './TodoList.js'
import TodoInput from './TodoInput.js'
import TodoUser from './TodoUser.js'

function App () {
  const $todoInput = document.querySelector('.new-todo')
  const $todoList = document.querySelector('.todo-list')
  const $todoUser = document.querySelector('#user-title')
  const data = []

  function addItem (text) {
    data.push({
      contents: text,
      isCompleted: false
    })

    todoList.post(text)
    todoList.updateItem(data)
  }

  function removeItem (index) {
    data.splice(index, 1)

    todoList.updateItem(data)
  }

  const todoList = new TodoList($todoList, data, (index) => {
    removeItem(index)
  })
  const todoInput = new TodoInput($todoInput, (text) => {
    addItem(text)
  })
  const todoUser = new TodoUser($todoUser)
}

new App()
