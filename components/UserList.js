export default function UserList(
  $el,
  { users, activeUser },
  { changeUser, createUser, deleteUser }
) {
  this.$el = $el
  this.state = { users, activeUser }

  const bindEvents = () => {
    this.$el.addEventListener('click', (event) => {
      const { action, userId } = event.target.dataset
      if (action === 'changeUser') {
        event.stopPropagation()
        changeUser(userId)
      }
    })

    const userCreateButton = this.$el.querySelector('.user-create-button')
    const inputUserName = (defaultUserName = '') => {
      const name = window.prompt(
        '추가하고 싶은 이름을 입력해주세요.',
        defaultUserName
      )
      if (name.length < 2) {
        window.alert('User의 이름은 최소 2글자 이상이어야 합니다.')
        return inputUserName(name)
      }
      return name
    }
    userCreateButton.addEventListener('click', () => {
      const userName = inputUserName()
      createUser(userName)
    })

    const userDeleteButton = this.$el.querySelector('.user-delete-button')
    userDeleteButton.addEventListener('click', () => {
      const userName = prompt('삭제하고 싶은 이름을 입력해주세요.')
      const targetUser = this.state.users.find((user) => user.name === userName)
      if (!targetUser) {
        alert('해당 이름을 가진 유저가 없습니다.')
        return
      }
      deleteUser(targetUser._id)
    })
  }

  this.render = () => {
    const { users } = this.state
    this.$el.innerHTML = users
      .map(({ name, _id }) => {
        return `<button class="ripple ${
          _id === this.state.activeUser && this.state.activeUser._id
            ? 'active'
            : ''
        }" data-action="changeUser" data-user-id="${_id}">${name}</button>`
      })
      .join('')

    this.$el.innerHTML += `
      <button class="ripple user-create-button">+ 유저 생성</button>
      <button class="ripple user-delete-button">- 유저 삭제</button>
      `

    bindEvents()
  }

  this.render()
}
