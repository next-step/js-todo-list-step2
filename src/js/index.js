import App from './app.js';
import DataController from './services/dataController.js';

const onUserCreateHandler = () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
}

const userCreateButton = document.querySelector('.user-create-button')
userCreateButton.addEventListener('click', onUserCreateHandler)


const dataController = new DataController();
const app = new App(document.querySelector('.app'), dataController);
