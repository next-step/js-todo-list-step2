import { ADDRESS } from './constants.js'

export default function TodoUser ($userTitle, $userList, userName, setActiveUser) {
  this.$userTitle = $userTitle
  this.$userList = $userList
  this.userName = userName
  this.userList = []

  this.getUsers = () => {
    fetch(`${ADDRESS.BASE_URL}/api/u`, {
      method: 'GET'
    }).then((response) => response.json())
      .then((data) => {
        this.userList = data
        this.render()
        this.bindEvents()
      })
  }

  this.setState = (activeUserName) => {
    this.userName = activeUserName
    this.getUsers()
    setActiveUser(this.userName)
  }

  this.bindEvents = () => {
    document.querySelectorAll('.ripple').forEach(($item) => {
      $item.addEventListener('click', (e) => {
        this.userName = e.target.innerText
        this.setState(this.userName)
      })
    })
  }

  this.render = () => {
    this.$userTitle.innerHTML = `<span><strong>${this.userName}</strong>'s Todo List</span>`

    let result = ''
    this.userList.map(({ name }) => {
      result += `<button class="ripple ${this.userName === name && 'active'}">${name}</button>`
    }).join('')
    this.$userList.innerHTML = result
  }

  this.getUsers()
}
