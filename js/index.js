import { initAddNewItem, todoList } from "./AddNewItem.js";
import { initTodolistButton } from "./ControlTodoButton.js";
import { initControlLocalStorage, saveLocalStorage, loadLocalStorage } from "./TodoLocalStorage.js";
import { initTodolistItems } from "./ControlTodoItems.js";

const userCreateButton = document.querySelector('.user-create-button')
const userList = document.querySelector('#user-list');
export var currentUserName = '';


const initControlUserList = () => {
  userList.addEventListener('click', onUserCreateHandler);
  userList.addEventListener('click', setCurrentUser)
}

const getFirstUser = () =>{
  const firstUser = userList.querySelector('.ripple');
  if(firstUser===undefined) return;
  currentUserName = firstUser.innerText;
}

const setCurrentUser = ({target}) => {
  if(target.classList.contains('user-create-button')) return;
  if(!target.classList.contains('ripple')) return;

  saveLocalStorage();

  currentUserName = target.innerText; 

  todoList.innerHTML = '';

  loadLocalStorage();
}


const onUserCreateHandler = ({target}) => {
  if(!target.classList.contains('user-create-button')) return;
  
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  const userTemplate = document.createElement('button');
  userTemplate.classList.add('ripple');
  userTemplate.innerText = userName;
  userList.insertBefore(userTemplate, userCreateButton);
}



const init = () => {
  // 페이지 로드 시 이벤트 리스너 부착
  getFirstUser();
  initAddNewItem();
  initTodolistButton();
  initControlLocalStorage();
  initTodolistItems();
  initControlUserList();
}

init();






