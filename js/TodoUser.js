import { USER, ADDRESS } from './constants.js'

export default function TodoUser ($userTitle, $userList) {
  this.$userTitle = $userTitle
  this.$userList = $userList
  this.userName = USER.Name
  this.userID = USER.ID
  this.userList = []

  this.getUsers = () => {
    fetch(`${ADDRESS.BASE_URL}/api/u`, {
      method: 'GET'
    }).then((response) => response.json())
    .then((data) => {
      this.userList = data
      this.render()
    })
  }

  this.render = () => {
    this.$userTitle.dataset.userID = this.userID
    this.$userTitle.innerHTML = `<span><strong>${this.userName}</strong>'s Todo List</span>`

    let result = ''
    this.userList.map(({ name }, index) => {
      result += `<button class="ripple">${name}</button>`
    }).join('')
    this.$userList.innerHTML = result
  }

  this.getUsers()
  this.render()
}
