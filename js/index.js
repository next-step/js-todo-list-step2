import { TodoApp } from '../components/TodoApp.js'

const $div = document.querySelector('#app');
new TodoApp($div).setState();
