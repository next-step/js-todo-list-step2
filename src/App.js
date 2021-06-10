import TodoApp from '@components/TodoApp.js';
import css from '@css/app.css';

function handleLoadAfter() {
  new TodoApp();
}

window.addEventListener('load', handleLoadAfter);
