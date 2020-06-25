import {checkSelector} from "../utils/validations.js"

export default function TodoInput(props) {
  if (new.target !== TodoInput) {
    return new TodoInput(props)
  }
  const { username, selector, postTodoItem }= props
  checkSelector(selector)
  this.username = username

  this.init = () => {
    this.$target = document.querySelector(selector)
    this.bindEvent()
  }

  this.bindEvent = () => {
    this.$target.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && e.target.value.trim()) {
        postTodoItem(this.username, e.target.value)
        e.target.value = ''
      }
    })
  }

  this.init()
}
