import App from './App.js';

const todoApp = App();

window.addEventListener('DOMContentLoaded', todoApp.init);
window.onload = todoApp.bindEvent;
