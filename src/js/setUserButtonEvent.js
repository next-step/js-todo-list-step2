import * as api from "./api.js";
import { userRender } from "./userRender.js"

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function onUserCreateHandler() {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  api.addUser(userName)
  await delay(1000);
  await userRender();
}

async function onUserDeleteHandler() {
  const activeUser = document.querySelector('.active');
  const delConfirm = confirm(activeUser.textContent + "을 삭제하시겠습니까?")
  if(delConfirm) api.delUser(activeUser.id);
  await delay(1000);
  await userRender();
}

function setUserButtonEvent() {
    const userCreateButton = document.querySelector('.user-create-button')
    const userDeleteButton = document.querySelector('.user-delete-button')
    userCreateButton.addEventListener('click', onUserCreateHandler)
    userDeleteButton.addEventListener('click', onUserDeleteHandler)
}

export { setUserButtonEvent };