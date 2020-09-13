import Component from '../core/Component.js';
import { API_BASE_URL, POST } from '../constant/index.js';
import State from '../core/State.js';
import { createFetchOption } from '../util/index.js';
import {
  createUserButton,
  createUserCreateButton,
} from '../templates/userButton.js';

export default class UserList extends Component {
  #users;

  constructor($target, props) {
    super($target, props);

    this.#users = new State([], this.render);
    this.props.activeUser.subscribe(this.render);

    this.initEventListener($target);
    this.loadUsers();
  }

  loadUsers = async () => {
    const data = await (await fetch(`${API_BASE_URL}/api/users`)).json();
    if (data instanceof Array) this.#users.value = data;
    if (!this.props.activeUser.value) this.props.activeUser.value = data[0];
  };

  createUser = async () => {
    let name = prompt('추가하고 싶은 이름을 입력해주세요.');

    name = name ? name.toString() : '';

    if (1 < name.length) {
      const option = createFetchOption(POST, { name });
      await fetch(`${API_BASE_URL}/api/users`, option);
      this.loadUsers();
    }
  };

  selectUser = (userId) => {
    this.props.activeUser.value = this.#users.value.find(
      (user) => user._id === userId
    );
  };

  initEventListener = ($target) => {
    $target.addEventListener('click', ({ target }) => {
      if (target.classList.contains('user-create-button')) this.createUser();
      if (target.className === 'ripple') this.selectUser(target.dataset.userId);
    });
  };

  render = () => {
    const users = this.#users.value;

    this.$target.innerHTML = '';
    users.forEach(
      ({ name, _id }) =>
        (this.$target.innerHTML += createUserButton(
          _id,
          name,
          this.props.activeUser.value._id === _id
        ))
    );
    this.$target.innerHTML += createUserCreateButton();
  };
}
