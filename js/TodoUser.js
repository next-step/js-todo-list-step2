import { USER } from './constants.js'

export default function TodoUser ($userTitle) {
  this.$userTitle = $userTitle
  this.userName = USER.Name
  this.userID = USER.ID

  this.render = () => {
    this.$userTitle.dataset.userID = this.userID
    this.$userTitle.innerHTML = `<span><strong>${this.userName}</strong>'s Todo List</span>`
  }

  this.render()
}
