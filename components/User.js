import { TAG_NAME } from '../utils/constants.js'
import api from '../api/api.js'

export default function User(props) {
  const { selector, currentUser, onChangeUser } = props
  if (new.target !== User) {
    return new User(props)
  }

  this.init = async () => {
    this.$target = document.querySelector(selector)
    this.currentUser = currentUser
    try {
      this.users = await api.getUsers()
    } catch (e) {
      console.error(e)
    }
    this.setState()
    this.bindEvent()
  }

  this.setState = () => {
    this.$target.innerHTML = this.users.map(({ _id, name }) => {
      return `<button class="ripple ${this.currentUser === name ? 'active' : ''}">${name}</button>`
    }).join("")
  }

  this.bindEvent = () => {
    const clickEventHandler = (e) => {
      if (
        e.target.tagName === TAG_NAME.BUTTON &&
        e.target.innerText !== this.currentUser
      ) {
        this.currentUser = e.target.innerText
        onChangeUser(e.target.innerText)
      }
    }
    this.$target.addEventListener('click', clickEventHandler)
  }

  this.init()
}
