import { todoCountComponentTemplate } from '../utils/templates.js'

export default function TodoCount(props) {
  if (new.target !== TodoCount) {
    return new TodoCount(props)
  }
  const { selector, totalCount, completedCount } = props

  this.init = () => {
    this.$target = document.querySelector(selector)
    this.setState(totalCount, completedCount)
  }

  this.setState = (totalCount, completedCount) => {
    this.$target.innerHTML = todoCountComponentTemplate(totalCount, completedCount)
  }

  this.init()
}
