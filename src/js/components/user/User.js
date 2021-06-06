import { $ } from "../../utils/element";

// 삭제, 등록
class User {
  constructor($userList) {
    this.$userList = $userList;
    this.name = '';
  }

  setEvent(customEvent) {
    this.$userList.addEventListener('click', ({ target }) => this.onClickEvent(target, customEvent))
  }

  reset() {
    this.name = '';
  }

  isValidName() {
    const MIN_NAME_SIZE = 2;
    if (this.name.length < MIN_NAME_SIZE) {
      alert('노노');
      this.reset();
      return false
    }
    return true;
  }

  onClickEvent(target, { add, delete: deleteUser }) {
    if (!target.dataset.action) return;
    
    const { action } = target.dataset;
    
    if (action === 'createUser') {
      this.name = prompt('추가하고 싶은 이름을 입력해주세요.');
      this.isValidName(this.name) && add(this.name);
      return;
    }

    if (action === 'deleteUser') {
      deleteUser(Number(target.id));
    }
  }
}

export default function($userList) {
  return new User($userList);
}