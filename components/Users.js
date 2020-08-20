export default function Users({
  usersId,
  userTitleId,
  users,
  currentUser,
  currentUserId,
  setUser,
}) {
  this.$users = document.getElementById(usersId);
  this.$todoUser = document.getElementById(userTitleId);
  this.state = {
    users: users,
    currentUser: currentUser,
    currentUserId: currentUserId,
  };
  this.setUser = setUser;

  this.render = () => {
    this.$todoUser.querySelector("strong").textContent = this.state.currentUser;
    this.$users.innerHTML = `
            ${this.state.users
              .map(
                ({ _id, name }) =>
                  `<button data-id=${_id} class="ripple ${
                    _id === this.state.currentUserId ? "active" : ""
                  }">${name}</button>`
              )
              .join("")}
        `;
  };

  this.setState = ({ users, currentUser, currentUserId }) => {
    this.state.users = users;
    this.state.currentUser = currentUser;
    this.state.currentUserId = currentUserId;
    this.render();
  };

  this.clickHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName === "BUTTON") {
      this.setUser({
        name: evt.target.textContent,
        _id: evt.target.dataset.id,
      });
    }
    this.render();
  };

  this.bindEventListener = () => {
    this.$users.addEventListener("click", (evt) => this.clickHandler(evt));
  };

  this.render();
  this.bindEventListener();
}
