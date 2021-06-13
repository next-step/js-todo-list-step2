import Home from '../components/index.js';
import { store } from '../store/index.js';

store.subscribe(() => {
  store.getState();
});
Home();
