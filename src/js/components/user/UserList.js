import { CLASS_NAME } from "../../const/USER.js";
import { $ } from "../../utils/element.js";

class UserList {
  constructor() {
    this.$userList = $(CLASS_NAME.USER_LIST);
    this.list = [];
    this.selectedId = '';
  }

  setState(selectedId, updatedList) {
    this.selectedId = selectedId;
    this.list = updatedList;
    this.render();
  }

  getUserHTML(selectedId, {_id, name}) {
    return `<button id="${_id}" class="ripple ${ selectedId === _id && 'active' }">${name}</button>`
  }

  render() {
    if (!this.list) return;
    
    this.$userList.innerHTML = this.list.map(item => this.getUserHTML(this.selectedId, item)).join('');
  }

  setEvent({ select }) {
    this.$userList.addEventListener('click', ({ target }) => select(target.id));
  }
}

export default function() {
  return new UserList();
}