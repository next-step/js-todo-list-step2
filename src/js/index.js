import userList from './dom/userList.js';

const onUserCreateHandler = () => {
  userList.add();
};
const userCreateButton = document.querySelector('.user-create-button')
userCreateButton.addEventListener('click', onUserCreateHandler)


let init = () => {
  userList.init();
}

init();

