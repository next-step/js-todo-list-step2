class UserItem {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  render() {
    return `<button class="ripple">${this.name}</button>`;
  }
}
