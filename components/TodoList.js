import { TAG_NAME, CLASS_NAME, KEY_NAME } from '../utils/constants.js'
import api from '../api/api.js'
import { todoItemHTMLTemplate } from '../utils/templates.js'

export default function TodoList(props) {
  const { selector, todos, username, getTodos } = props
  if (new.target !== TodoList) {
    return new TodoList(props)
  }

  this.init = () => {
    this.$target = document.querySelector(selector)
    this.todos = todos
    this.username = username
    this.render()
    this.bindEvent()
  }

  this.bindEvent = () => {
    const onClickTodoItemHandler = async ({ target }) => {
      const li = target.closest('li')
      const { id } = li.dataset
      if (
        target.tagName === TAG_NAME.INPUT &&
        target.className === CLASS_NAME.TOGGLE
      ) {
        try {
          await api.toggleTodo(this.username, id)
          getTodos()
        } catch (e) {
          console.error(e)
        }
      } else if (target.tagName === TAG_NAME.BUTTON) {
        try {
          await api.deleteTodo(this.username, id)
          getTodos()
        } catch (e) {
          console.error(e)
        }
      }
    }

    const onDblclickTodoItemHandler = (e) => {
      const li = e.target.closest('li')
      this.editInputValue = e.target.childNodes[2].textContent.trim() // 수정 시작할 때 초기 상태의 value 저장
      if (!li.classList.contains(CLASS_NAME.EDITING)) {
        li.classList.add(CLASS_NAME.EDITING)
        const $editInput = li.querySelector(`.${CLASS_NAME.EDIT}`)
        $editInput.focus()
        $editInput.selectionStart = this.editInputValue.length
      }
    }
    const onEditTodoItemHandler = async (e) => {
      if (e.key !== KEY_NAME.ESC && e.key !== KEY_NAME.ENTER) {
        return
      }
      const li = e.target.closest('li')
      li.classList.remove(CLASS_NAME.EDITING)
      if (e.key === KEY_NAME.ENTER && e.target.value.trim()) {
        li.classList.remove(CLASS_NAME.EDITING)
        const { id } = li.dataset
        try {
          await api.updateTodoContent({
            username: this.username,
            id,
            data: { contents: e.target.value.trim() },
          })
          getTodos()
        } catch (e) {
          console.error(e)
        }
      }
    }

    const onFocusOutTodoItemHandler = (e) => {
      if (
        e.target.tagName === TAG_NAME.INPUT &&
        e.target.className === CLASS_NAME.EDIT
      ) {
        e.target.value = this.editInputValue //초기상태의 value로 reset
        const li = e.target.closest('li')
        if (li.classList.contains(CLASS_NAME.EDITING)) {
          li.classList.remove(CLASS_NAME.EDITING)
        }
      }
    }

    const onChangePriorityHandler = async (e) => {
      if (e.target.tagName !== TAG_NAME.SELECT) {
        return
      }
      const li = e.target.closest('li')
      const { id } = li.dataset
      if (e.target.value !== 0) { // option을 선택하지 않은 경우는 제외
        try {
          await api.updateTodoPriority({
            username: this.username,
            id,
            data: { priority: e.target.value },
          })
          getTodos()
        } catch (e) {
          console.error(e)
        }
      }
    }

    this.$target.addEventListener('click', onClickTodoItemHandler)
    this.$target.addEventListener('dblclick', onDblclickTodoItemHandler)
    this.$target.addEventListener('keyup', onEditTodoItemHandler)
    this.$target.addEventListener('focusout', onFocusOutTodoItemHandler)
    this.$target.addEventListener('change', onChangePriorityHandler) // chip select
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

