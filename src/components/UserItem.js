class UserItem {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  static render(name) {
    return `<button class="ripple">${name}</button>`;
  }
}

export default UserItem;
