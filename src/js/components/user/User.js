import { ALERT } from '../../const/USER.js';

class User {
  constructor($userList) {
    this.$userList = $userList;
    this.name = '';
  }

  get nameSize() {
    return this.name.length;
  }

  event = {
    createUser: ({add}) => {
      this.name = prompt(ALERT.PLZ_INSERT_NAME);
      this.isValidName(this.name) && add(this.name);
    },
    deleteUser: ({delete: deleteUser}) => deleteUser()
  }

  reset() {
    this.name = '';
  }
  
  isValidName() {
    const MIN_NAME_SIZE = 2;
    if (this.nameSize < MIN_NAME_SIZE) {

      alert(ALERT.PLZ_CHECK_NAME_SIZE);
      this.reset();
      return false
    }
    return true;
  }

  onClickEvent({ dataset: { action } }, event) {
    if (!action) return;
    
    this.event[action](event);
  }

  setEvent(customEvent) {
    this.$userList.addEventListener('click', ({ target }) => this.onClickEvent(target, customEvent))
  }
}

export default function($userList) {
  return new User($userList);
}