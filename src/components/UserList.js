export default class UserList {
  constructor({ $target, changeActiveUser, createUser, deleteUser }) {
    const section = document.createElement('section');
    section.addEventListener('click', ({ target }) => {
      if (target.tagName !== 'BUTTON') return;
      if (target.dataset.action === 'createUser') {
        const username = prompt('추가하고 싶은 이름을 입력해주세요.');
        if (!username || username.length < 2) alert('2글자 이상이어야 합니다.');
        else createUser(username);
      } else if (target.dataset.action === 'deleteUser') {
        if (confirm(`${this.state.activeUsername}을 삭제하시겠습니까?`))
          deleteUser();
      } else changeActiveUser(target.dataset.id);
    });

    this.userList = document.createElement('div');
    this.userList.id = 'user-list';

    section.appendChild(this.userList);
    $target.appendChild(section);

    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    if (!this.state?.userList) return;
    this.userList.innerHTML =
      `${this.state.userList
        .map(({ _id, name }) => {
          return `<button class="${
            this.state.activeId === _id ? 'ripple active' : 'ripple'
          }" data-id="${_id}">${name}</button>`;
        })
        .join('')}` +
      `
      <button class="ripple user-create-button" data-action="createUser">
        + 유저 생성
      </button>
      <button class="ripple user-delete-button" data-action="deleteUser">
        삭제 -
      </button>
    `;
  }
}
