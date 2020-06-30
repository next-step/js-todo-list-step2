import { todoClassName } from '../utils/constant.js'
import { isEnterKey, isEscKey, isNotEmptyString } from '../utils/validator.js'

export default function TodoList({
  data,
  $target,
  onToggleTodo,
  onDeleteTodo,
  onChangeTodo,
  onChangeTodoPriority,
}) {
  if (!new.target) {
    throw new Error('TodoList must be called with new')
  }

  if (!$target) {
    throw new Error('$target must be injected')
  }

  const todoPriorityTemplate = (priority) =>
    priority
      ? `<span class="chip ${
          priority === 1 ? 'primary' : 'secondary'
        }">${priority}순위</span>`
      : `<select class="chip select">
          <option value="0" selected>순위</option>
          <option value="1">1순위</option>
          <option value="2">2순위</option>
        </select>`

  const todoItemTemplate = (todoItem, index) => `
    <li data-id="${index}" class="${todoItem.isCompleted ? 'completed' : ''}">
      <div class="view">
        <input class="toggle" type="checkbox" ${
          todoItem.isCompleted ? 'checked' : ''
        }>
        <label class="label">
          ${todoPriorityTemplate(todoItem.priority)}
          ${todoItem.contents}
        </label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="${todoItem.contents}">
    </li>`

  const onClickHandler = (e) => {
    if (e.target.classList.contains(todoClassName.TOGGLE)) {
      const id = e.target.closest('li').dataset.id
      onToggleTodo(Number(id))
    }

    if (e.target.classList.contains(todoClassName.DESTROY)) {
      const id = e.target.closest('li').dataset.id
      onDeleteTodo(Number(id))
    }
  }

  const onKeydownHandler = (e) => {
    if (!e.target.classList.contains(todoClassName.EDIT)) {
      return
    }
    const li = e.target.closest('li')

    if (isEnterKey(e) && isNotEmptyString(e.target.value)) {
      const text = e.target.value
      const id = li.dataset.id

      li.classList.remove(todoClassName.EDITING)
      onChangeTodo(text, Number(id))
    }
    if (isEscKey(e)) {
      e.target.value = this.todoInitialInputValue
      li.classList.remove(todoClassName.EDITING)
    }
  }

  const onDbClickHandler = (e) => {
    if (!e.target.classList.contains(todoClassName.LABEL)) {
      return
    }

    const li = e.target.closest('li')
    li.classList.add(todoClassName.EDITING)

    const input = li.querySelector(`.${todoClassName.EDIT}`)
    input.focus()
    input.setSelectionRange(input.value.length, input.value.length)
    this.todoInitialInputValue = input.value
  }

  const onFocusoutHandler = (e) => {
    if (!e.target.classList.contains(todoClassName.EDIT)) {
      return
    }

    e.target.value = this.todoInitialInputValue

    const li = e.target.closest('li')
    if (li.classList.contains(todoClassName.EDITING)) {
      li.classList.remove(todoClassName.EDITING)
    }
  }

  const onChangeEventHandler = (e) => {
    if (!e.target.classList.contains(todoClassName.CHIP)) {
      return
    }
    const li = e.target.closest('li')
    const id = li.dataset.id
    onChangeTodoPriority(Number(id), Number(e.target.value))
  }

  this.setState = function (nextData) {
    this.todos = nextData
    this.render()
  }

  this.render = function () {
    this.$target.innerHTML = this.todos.map(todoItemTemplate).join('')
  }

  this.bindEvents = function () {
    this.$target.addEventListener('click', onClickHandler)
    this.$target.addEventListener('dblclick', onDbClickHandler)
    this.$target.addEventListener('keydown', onKeydownHandler)
    this.$target.addEventListener('focusout', onFocusoutHandler)
    this.$target.addEventListener('change', onChangeEventHandler)
  }

  this.init = function () {
    this.todos = data
    this.$target = $target
    this.bindEvents()
  }

  this.init()
  this.render()
}
