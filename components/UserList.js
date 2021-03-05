export default function UserList($el, { users }) {
  this.$el = $el
  this.state = { users }

  this.render = () => {
    const { users } = this.state
    this.$el.innerHTML = users
      .map(({ name, active }) => {
        return `<button class="ripple ${
          active ? "active" : ""
        }">${name}</button>`
      })
      .join("")

    this.$el.innerHTML +=
      '<button class="ripple user-create-button">+ 유저 생성</button>'
  }

  this.render()
}
