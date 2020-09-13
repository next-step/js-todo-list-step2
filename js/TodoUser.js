import { ADDRESS } from './constants.js'

export default function TodoUser ($userTitle, $userCreateButton, $userList, userName, setActiveUser) {
  this.$userTitle = $userTitle
  this.$userList = $userList
  this.$userCreateButton = $userCreateButton
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
  
  const onUserCreateHandler = () => {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  }

  this.setState = (activeUserName) => {
    this.userName = activeUserName
    this.getUsers()
    setActiveUser(this.userName)
  }

  this.bindEvents = () => {
    document.querySelectorAll('.ripple').forEach(($item) => {
      $item.addEventListener('click', ({target}) => {
        if (target.classList.contains('user-create-button')){
          onUserCreateHandler();
        }
        else{
          this.userName = target.innerText
          this.setState(this.userName)
        }  
      })
    })
  }

  this.render = () => {
    this.$userTitle.innerHTML = `<span><strong>${this.userName}</strong>'s Todo List</span>`

    let result = ''
    this.userList.map(({ name }) => {
      result += `<button class="ripple ${this.userName === name && 'active'}">${name}</button>`
    }).join('')
    this.$userList.innerHTML = result + `<button class="ripple user-create-button">+ 유저 생성</button>`
  }

  this.getUsers()
}
