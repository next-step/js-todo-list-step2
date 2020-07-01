import { checkSelector } from '../utils/validations.js'
import { tagName, className, keyName, httpMethod } from '../utils/constants.js'
import requestManager from '../api/api.js'
import { todoItemHTMLTemplate } from '../utils/templates.js'

export default function TodoList(props) {
  const { selector, todos, username, getTodos } = props
  if (new.target !== TodoList) {
    return new TodoList(props)
  }
  checkSelector(selector)

  this.init = () => {
    this.$target = document.querySelector(selector)
    this.todos = todos
    this.username = username
    this.render()
    this.bindEvent()
  }

  this.bindEvent = () => {
    const clickEventHandler = async (e) => {
      const li = e.target.closest('li')
      const { id } = li.dataset
      if (
        e.target.tagName === tagName.INPUT &&
        e.target.className === className.TOGGLE
      ) {
        try {
          await requestManager({
            method: httpMethod.PUT,
            path: `/api/u/${this.username}/item/${id}/toggle`,
          })
          getTodos()
        } catch(e) {
          console.error(e)
        }
      } else if (e.target.tagName === tagName.BUTTON) {
        try {
          await requestManager({
            method: httpMethod.DELETE,
            path: `/api/u/${this.username}/item/${id}`,
          })
          getTodos()
        } catch(e) {
          console.error(e)
        }
      }
    }

    const dblclickEventHandler = (e) => {
      const li = e.target.closest('li')
      this.editInputValue = e.target.childNodes[2].textContent.trim() // 수정 시작할 때 초기 상태의 value 저장
      if (!li.classList.contains(className.EDITING)) {
        li.classList.add(className.EDITING)
        const $editInput = li.querySelector(`.${className.EDIT}`)
        $editInput.focus()
        $editInput.selectionStart = this.editInputValue.length
      }
    }
    const keyUpEventHandler = async (e) => {
      if (e.key === keyName.ESC) {
        const li = e.target.closest('li')
        li.classList.remove(className.EDITING)
      } else if (e.key === keyName.ENTER && e.target.value.trim()) {
        const li = e.target.closest('li')
        li.classList.remove(className.EDITING)
        const { id } = li.dataset
        try {
          await requestManager({
            method: httpMethod.PUT,
            path: `/api/u/${this.username}/item/${id}`,
            body: { contents: e.target.value.trim() }
          })
          getTodos()
        } catch (e) {
          console.error(e)
        }
      }
    }

    const focusOutEventHandler = (e) => {
      if (
        e.target.tagName === tagName.INPUT &&
        e.target.className === className.EDIT
      ) {
        e.target.value = this.editInputValue //초기상태의 value로 reset
        const li = e.target.closest('li')
        if (li.classList.contains(className.EDITING)) {
          li.classList.remove(className.EDITING)
        }
      }
    }

    const changeEventHandler = async (e) => {
      if (e.target.tagName === tagName.SELECT) {
        const li = e.target.closest('li')
        const { id } = li.dataset
        if (e.target.value !== 0) { // option을 선택하지 않은 경우는 제외
          try {
            await requestManager({
              method: httpMethod.PUT,
              path: `/api/u/${this.username}/item/${id}/priority`,
              body: { priority: e.target.value }
            })
            getTodos()
          } catch (e) {
            console.error(e)
          }
        }
      }
    }

    this.$target.addEventListener('click', clickEventHandler)
    this.$target.addEventListener('dblclick', dblclickEventHandler)
    this.$target.addEventListener('keyup', keyUpEventHandler)
    this.$target.addEventListener('focusout', focusOutEventHandler)
    this.$target.addEventListener('change', changeEventHandler) // chip select
  }

  this.render = () => {
    this.$target.innerHTML = this.todos.map(todoItemHTMLTemplate).join('')
  }

  this.setState = (username, todos) => {
    this.username = username
    if (todos) { // username 만 update 하는 경우를 생각해서 조건문 처리하였습니당
      this.todos = todos
      this.render()
    }
  }

  this.init()
}

