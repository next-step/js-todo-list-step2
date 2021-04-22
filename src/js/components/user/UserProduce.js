import { $, $All } from '../../utils/common.js';
import { userItems } from '../../utils/events.js';

export function UserProduce() {
  this.$userContainer = $('#user-list');
  const ripples = $All('.ripple');

  this.setState = (newUser) => {
    this.$user = { name: newUser };
    const newUserHtml = `<button class="ripple" data-_id="${this.$user.name}">${this.$user.name}</button>`;

    this.render(newUserHtml);
  }

  this.render = (newUserHtml) => {
    this.$userContainer
    .insertAdjacentHTML('afterbegin', newUserHtml);
    
    userItems[0].push(this.$user);
    Array.from(ripples).map(user => user.classList.remove('active'));
    this.$userContainer.firstChild.classList.add('active');
  }
}
