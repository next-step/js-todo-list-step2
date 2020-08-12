import { TAG_NAME } from '../utils/constants.js'

export default function TodoFilter({ selector, onFilter }) {
  if (new.target !== TodoFilter) {
    return new TodoFilter({ selector, onFilter })
  }

  this.init = () => {
    this.$target = document.querySelector(selector)
    this.bindEvent()
  }

  this.bindEvent = () => {
    this.$target.addEventListener('click', (e) => {
      if (e.target.tagName === TAG_NAME.A) {
        e.preventDefault()
        onFilter(e.target.className)
      }
    })
  }

  this.init()
}
