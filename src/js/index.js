import App from './app.js';
import DataController from './services/dataController.js';

const dataController = new DataController();
const app = new App(document.querySelector('.app'), dataController);