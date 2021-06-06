import todoStore from '../store/todoStore.js';
import Home from '../components/index.js';
const app = document.querySelector('#app');

todoStore.getState();
Home(app);
