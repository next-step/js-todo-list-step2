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
        this.bindEvents()
      })
  }

  this.bindEvents = () => {
    document.querySelectorAll('.ripple').forEach(($item) => {
      $item.addEventListener('click', (e) => {
        e.stopPropagation()
        const $oldUser = e.currentTarget.parentNode.querySelector('.active')
        $oldUser.classList.remove('active')

        const $selectedUser = e.target
        this.userID = $selectedUser.dataset
        this.userName = $selectedUser.innerText
        $selectedUser.classList.add('active')

        USER.ID = this.userID
        USER.Name = this.userName
      })
    })
  }

  this.render = () => {
    this.$userTitle.dataset.userID = this.userID
    this.$userTitle.innerHTML = `<span><strong>${this.userName}</strong>'s Todo List</span>`

    let result = ''
    this.userList.map(({ _id, name }) => {
      result += `<button class="ripple ${this.userName == name ? 'active' : ''}" id="${_id}">${name}</button>`
    }).join('')
    this.$userList.innerHTML = result
  }

  this.getUsers()
}
