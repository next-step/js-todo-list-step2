export default function UserList($el, { users, createUser }) {
  this.$el = $el
  this.state = { users }

  const bindEvents = () => {
    const userCreateButton = this.$el.querySelector('.user-create-button')
    userCreateButton.addEventListener('click', () => {
      const userName = prompt('추가하고 싶은 이름을 입력해주세요.')
      createUser(userName)
    })
  }

  this.render = () => {
    const { users } = this.state
    this.$el.innerHTML = users
      .map(({ name, active }) => {
        return `<button class="ripple ${
          active ? 'active' : ''
        }">${name}</button>`
      })
      .join('')

    this.$el.innerHTML +=
      '<button class="ripple user-create-button">+ 유저 생성</button>'

    bindEvents()
  }

  this.render()
}
