import { todoClassName } from '../utils/constant.js'

export default function TodoUserList({
  $target,
  todoUserList,
  activeUser,
  onSetActiveUser,
}) {
  if (!new.target) {
    throw new Error('TodoUsers must be called with new')
  }

  if (!$target) {
    throw new Error('$target must be injected')
  }
  this.$target = $target
  this.todoUserList = todoUserList
  this.activeUser = activeUser

  const onClickHandler = (e) => {
    if (!e.target.classList.contains(todoClassName.RIPPLE)) {
      return
    }
    onSetActiveUser(e.target.textContent)
  }

  const todoUserTemplate = (todoUser) =>
    `<button class="${
      todoUser === this.activeUser ? 'ripple active' : 'ripple'
    }">${todoUser}</button>`

  this.setState = function (nextData) {
    this.activeUser = nextData
    this.render()
  }

  this.render = function () {
    this.$target.innerHTML = this.todoUserList.map(todoUserTemplate).join('')
  }

  this.$target.addEventListener('click', onClickHandler)

  this.render()
}
