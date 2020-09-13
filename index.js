import App from './js/components/App.js';

const $target = document.querySelector('#app');

new App(
  $target,
  {},
  {
    $userTitle: $target.querySelector('#user-title'),
    $userList: $target.querySelector('#user-list'),
  }
);
