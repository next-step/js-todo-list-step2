import Component from '../core/Component.js';
import { API_BASE_URL } from '../constant/index.js';
import State from '../core/State.js';

export default class UserList extends Component {
  #users;

  constructor($target, props) {
    super($target, props);

    this.#users = new State([]);

    this.initEventListener($target);
    this.loadUsers();
    this.render();
  }

  loadUsers = async () => {
    const data = await (await fetch(`${API_BASE_URL}/api/users`)).json();
    if (data instanceof Array) this.#users.value = data;
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

  render = () => {};
}
