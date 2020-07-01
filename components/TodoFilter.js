import { checkSelector } from '../utils/validations.js'
import { tagName } from '../utils/constants.js'

export default function TodoFilter({ selector, onFilter }) {
  if (new.target !== TodoFilter) {
    return new TodoFilter({ selector, onFilter })
  }
  checkSelector(selector)

  this.init = () => {
    this.$target = document.querySelector(selector)
    this.bindEvent()
  }

  this.bindEvent = () => {
    this.$target.addEventListener('click', (e) => {
      if (e.target.tagName === tagName.A) {
        e.preventDefault()
        onFilter(e.target.className)
      }
    })
  }

  this.init()
}
