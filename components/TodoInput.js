import { checkSelector } from "../utils/validations.js"
import { tagName } from "../utils/constants.js"

export default function TodoInput(props) {
  if (new.target !== TodoInput) {
    return new TodoInput(props)
  }
  const { selector, postTodoItem }= props
  checkSelector(selector)

  this.init = () => {
    this.$target = document.querySelector(selector)
    this.bindEvent()
  }

  this.bindEvent = () => {
    const keyPressHandler = (e) => {
      if (e.key === tagName.ENTER && e.target.value.trim()) {
        postTodoItem(e.target.value)
        e.target.value = ''
      }
    }

    this.$target.addEventListener('keypress', keyPressHandler)
  }

  this.init()
}
