import App from './js/components/App.js';

const $target = document.querySelector('#app');

new App(
  $target,
  {},
  {
    $userList: $target.querySelector('#user-list'),
  }
);
