import Component from '../core/Component.js';
import { API_BASE_URL } from '../constant/index.js';
import State from '../core/State.js';
import { createUserButton } from '../templates/userButton.js';
import { convert2Html } from '../util/index.js';

export default class UserList extends Component {
  #users;

  constructor($target, props) {
    super($target, props);

    this.#users = new State([]);

    this.initEventListener($target);
    this.loadUsers();
  }

  loadUsers = async () => {
    const data = await (await fetch(`${API_BASE_URL}/api/users`)).json();
    if (data instanceof Array) this.#users.value = data;
    this.render();
  };

  createUser = () => {
    let userName = prompt('추가하고 싶은 이름을 입력해주세요.');
    userName = userName ? userName.toString() : '';
    console.log(userName);
  };

  initEventListener = ($target) => {
    $target.addEventListener('click', ({ target }) => {
      if (target.classList.contains('user-create-button')) this.createUser();
    });
  };

  render = () => {
    const users = this.#users.value;
    console.log(users);

    users.forEach(({ name }) => {
      const $userBtn = convert2Html(createUserButton(name));
      this.$target.prepend($userBtn);
    });
  };
}
