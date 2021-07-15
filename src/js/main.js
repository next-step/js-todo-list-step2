import App from './App.js';
import { userAPI, todoAPI } from "./api/api.js";

new App(document.querySelector('#app', userAPI, todoAPI));


// const onUserCreateHandler = () => {
//   const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
// }

// const userCreateButton = document.querySelector('.user-create-button')
// userCreateButton.addEventListener('click', onUserCreateHandler)

