import { KEY_NAME } from '../utils/constants.js'
import api from '../api/api.js'

export default function TodoInput(props) {
  if (new.target !== TodoInput) {
    return new TodoInput(props)
  }
  const { selector, username, getTodos } = props

  this.init = () => {
    this.$target = document.querySelector(selector)
    this.username = username
    this.bindEvent()
  }

  this.bindEvent = () => {
    const onAddTodoItemHandler = async (e) => {
      if (e.key === KEY_NAME.ENTER && e.target.value.trim()) {
        try {
          await api.createTodo(this.username, { contents: e.target.value })
          getTodos()
        } catch (e) {
          console.error(e)
        }
        e.target.value = ''
      }
    }

    this.$target.addEventListener('keypress', onAddTodoItemHandler)
  }

  this.setState = (username) => {
    this.username = username
  }

  this.init()
}
