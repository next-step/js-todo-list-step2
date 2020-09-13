import Component from '../core/Component.js';

export default class UserList extends Component {
  constructor($target, props) {
    super($target, props);
    this.initEventListener($target);
  }

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
