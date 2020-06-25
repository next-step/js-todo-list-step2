import { checkSelector } from "../utils/validations.js"

export default function TodoList(props) {
  const { selector, todos, username, onToggle, onDelete, onEdit } = props
  if (new.target !== TodoList) {
    return new TodoList(props)
  }
  checkSelector(selector)

  this.init = () => {
    this.$target = document.querySelector(selector)
    this.username = username
    this.todos = todos
    this.render()
    this.bindEvent()
  }

  this.bindEvent = () => {
    const clickEventHandler = (e) => {
      const li = e.target.closest('li')
      const {id} = li.dataset
      if (e.target.tagName === 'INPUT' && e.target.className === 'toggle') {
        onToggle(this.username, id)
      } else if (e.target.tagName === 'BUTTON') {
        onDelete(this.username, id)
      }
    }
    const dblclickEventHandler = (e) => {
      const li = e.target.closest('li')
      this.editInputValue = e.target.innerText // 수정 시작할 때 초기 상태의 value 저장
      if (!li.classList.contains('editing')) {
        li.classList.add('editing')
        li.querySelector('.edit').focus()
      }
    }
    const keyUpEventHandler = (e) => {
      if (e.key === 'Escape') { // ESC
        const li = e.target.closest('li')
        li.classList.remove('editing')
      } else if (e.key === 'Enter' && e.target.value.trim()) {
        const li = e.target.closest('li')
        li.classList.remove('editing')
        onEdit({
          username: this.username,
          itemId: li.dataset.id,
          contents: e.target.value.trim()
        })
      }
    }

    const focusInEventHandler = (e) => {
      if (e.target.tagName === 'INPUT' && e.target.className === 'edit') {
        e.target.selectionStart = e.target.value.length
      }
    }

    const focusOutEventHandler = (e) => {
      if (e.target.tagName === 'INPUT' && e.target.className === 'edit') {
        e.target.value = this.editInputValue //초기상태의 value로 reset
        const li = e.target.closest('li')
        if (li.classList.contains('editing')) {
          li.classList.remove('editing')
        }
      }
    }

    this.$target.addEventListener('click', clickEventHandler)
    this.$target.addEventListener('dblclick', dblclickEventHandler)
    this.$target.addEventListener('keyup', keyUpEventHandler)
    this.$target.addEventListener('focusin', focusInEventHandler) // 맨 마지막 글자에 focus
    this.$target.addEventListener('focusout', focusOutEventHandler)
  }

  const todoItemHTMLTemplate = ({_id, contents, isCompleted}, index) => {
    return `
      <li data-id=${_id} data-index=${index} class=${isCompleted ? 'completed' : ''}>
          <div class="view">
            <input class="toggle" type="checkbox" />
            <label class="label">${contents}</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value=${contents} />
      </li>`
  }

  this.render = () => {
    this.$target.innerHTML = this.todos.map(todoItemHTMLTemplate).join()
  }

  this.setState = (username, todos) => {
    this.username = username
    this.todos = todos
    this.render()
  }

  this.init()
}

