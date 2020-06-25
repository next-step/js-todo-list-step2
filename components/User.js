import { checkSelector } from "../utils/validations.js"

const userHTMLTemplate = ({id, name}) => `<button class="ripple active">${name}</button>`

export default function User({ selector, users }){
  if (new.target !== User) {
    return new User({ selector, users })
  }
  checkSelector(selector)

  this.setState = (users) => {
    this.$target.innerHTML = users.map(userHTMLTemplate).join()
  }

  this.init = () => {
    this.$target = document.querySelector(selector)
    this.setState(users)
  }
  this.init()
}
