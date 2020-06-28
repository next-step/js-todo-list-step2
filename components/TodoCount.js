import { checkSelector } from '../utils/validations.js'

export default function TodoCount(props) {
  if (new.target !== TodoCount) {
    return new TodoCount(props)
  }
  const { selector, totalCount, completedCount } = props
  checkSelector(selector)

  this.init = () => {
    this.$target = document.querySelector(selector)
    this.setState(totalCount, completedCount)
  }

  this.setState = (totalCount, completedCount) => {
    this.$target.innerHTML = `
          <span id="todo-count" class="todo-count">총 <span class="count">${totalCount}</span> 개 중</span>
          <span id="completed-count" class="todo-count"><span class="count">${completedCount}</span> 개 완료</span>
     `
  }

  this.init()
}
