import { todoClassName } from '../utils/constant.js'

export default function TodoUserList({
  $target,
  todoUserList,
  activeUser,
  onSetActiveUser,
}) {
  if (!(this instanceof TodoUserList)) {
    throw new Error('TodoUsers must be called with new')
  }

  if (!$target) {
    throw new Error('$target must be injected')
  }
  this.$target = $target
  this.todoUserList = todoUserList
  this.activeUser = activeUser

  const onClickHandler = (e) => {
    if (
      e.target.nodeName === 'BUTTON' &&
      e.target.classList.contains(todoClassName.RIPPLE)
    ) {
      onSetActiveUser(e.target.innerHTML)
    }
  }

  const todoUserTemplate = (todoUser) =>
    todoUser === this.activeUser
      ? `<button class="ripple active">${todoUser}</button>`
      : `<button class="ripple">${todoUser}</button>`

  this.setState = function (nextData) {
    this.users = nextData
    this.render()
  }

  this.render = function () {
    this.$target.innerHTML = this.todoUserList.map(todoUserTemplate).join('')
  }

  this.$target.addEventListener('click', onClickHandler)

  this.render()
}
