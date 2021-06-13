export default class Username {
  constructor() {
    this.$username = document.querySelector('#user-title strong');
  }

  render(name) {
    this.$username.textContent = name;
  }
}
