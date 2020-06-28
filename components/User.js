import { checkSelector } from '../utils/validations.js'
import { tagName } from '../utils/constants.js'

export default function User(props) {
  const { selector, currentUser, users, onChangeUser } = props
  if (new.target !== User) {
    return new User(props)
  }
  checkSelector(selector)

  this.init = () => {
    this.$target = document.querySelector(selector)
    this.users = users
    this.currentUser = currentUser
    this.setState()
    this.bindEvent()
  }

  this.setState = () => {
    this.$target.innerHTML = this.users.map(({ _id, name }) => {
      return `<button class="ripple ${this.currentUser === name ? 'active' : ''}">${name}</button>`
    }).join()
  }

  this.bindEvent = () => {
    const clickEventHandler = (e) => {
      if (
        e.target.tagName === tagName.BUTTON &&
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
