/* eslint-disable prettier/prettier */
class Userlist {
  constructor({ $app }) {
    this.$target = document.createElement('section');
    $app.appendChild(this.$target);
    this.render();
  }
  setState(nextState) {
    this.state = {...this.state, ...nextState}
    this.render();
  }
  template() {
    if(!this.state) return ""
    const {userList, userName} = this.state;
    return `
      <div id="user-list">
        ${userList.map((user) => `
          <button class="ripple ${userName === user ? "active" : ""}">${user}</button>
        `
        ).join("")}
        <button class="ripple user-create-button" data-action="createUser">
            + 유저 생성
        </button>
        <button class="ripple user-delete-button" data-action="deleteUser">
            삭제 -
        </button>
      </div>
      `;
  }
  render() {
    this.$target.innerHTML = this.template();
  }
}

export default Userlist;
