import {userAPI} from './api/api.js';

const onUserCreateHandler = () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  let user = {name :'넘흐'}
  const response = userAPI.addUser(user);
  drawUserList(response.user);
  drawTodoList(response.todo);
}

const onUserDeleteHandler = (userId) =>{
  userAPI.deleteItems(userId);
  userAPI.deleteUser(userId);
  drawUserList(response.user);
  drawTodoList(response.todo);
}

const onActiveClickHander = () => {
  let items = userAPI.getItems()
  drawUserList(itesm)
}




function init () {
  let users = userAPI.getUsers();
  drawUserList(users);
}


function drawUserList(users,user) {
  
}

function drawTodoList(items){

}

const userCreateButton = document.querySelector('.user-create-button')
userCreateButton.addEventListener('click', onUserCreateHandler)


