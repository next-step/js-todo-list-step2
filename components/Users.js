import {
  todoUsersTemplate,
  userTemplate,
  errorCallTemplate,
} from "../utils/template.js";

export default function Users({
  usersId,
  userTitleId,
  users,
  currentUser,
  currentUserId,
  setUser,
}) {
  this.state = {
    users,
    currentUser,
    currentUserId,
  };
  this.init = () => {
    if (!(this instanceof Users)) {
      throw new Error(errorCallTemplate);
    }
    this.$users = document.getElementById(usersId);
    this.$todoUser = document.getElementById(userTitleId);
    this.setUser = setUser;
  };

  this.render = () => {
    this.$todoUser.innerHTML = userTemplate(this.state.currentUser);
    this.$users.innerHTML = todoUsersTemplate(
      this.state.users,
      this.state.currentUserId
    );
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

  this.init();
  this.render();
  this.bindEventListener();
}
