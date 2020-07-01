import { checkSelector } from '../utils/validations.js'
import { keyName, httpMethod } from '../utils/constants.js'
import requestManager from '../api/api.js'

export default function TodoInput(props) {
  if (new.target !== TodoInput) {
    return new TodoInput(props)
  }
  const { selector, username, getTodos } = props
  checkSelector(selector)

  this.init = () => {
    this.$target = document.querySelector(selector)
    this.username = username
    this.bindEvent()
  }

  this.bindEvent = () => {
    const keyPressHandler = async (e) => {
      if (e.key === keyName.ENTER && e.target.value.trim()) {
        try {
          await requestManager({
            method: httpMethod.POST,
            path: `/api/u/${this.username}/item`,
            body: { contents: e.target.value }
          })
          getTodos()
        } catch (e) {
          console.error(e)
        }
        e.target.value = ''
      }
    }

    this.$target.addEventListener('keypress', keyPressHandler)
  }

  this.setState = (username) => {
    this.username = username
  }

  this.init()
}
