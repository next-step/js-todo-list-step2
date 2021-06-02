/* eslint-disable prettier/prettier */

class Userlist {
  constructor({ $app, onClick }) {
    this.onClick = onClick;
    this.$target = document.createElement('section');
    $app.appendChild(this.$target);
    this.render();
  }
  setState(nextState) {
    this.state = { ...this.state, ...nextState };
    this.render();
  }
  template() {
    if (!this.state) return '';
    
    const { userList, activeName } = this.state;
    return `
      <div id="user-list">
        ${userList.map(({name, _id}) => `
          <button class="ripple${activeName === name ? " active" : ""}" data-id=${_id}>${name}</button>
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
    this.mounted();
  }

  mounted() {
    this.$target.addEventListener("click", this.onClick)
  }
}

export default Userlist;
