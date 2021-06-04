import {userAPI, todoAPI, storage} from "./api/api.js";

const onUserCreateHandler = () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  let user = {name : userName}
  const response = userAPI.addUser(user);
  drawUserList(response, userName);
  drawTodoList(response.todo);
}

const onUserDeleteHandler = (userId) =>{
  userAPI.deleteItems(userId);
  userAPI.deleteUser(userId);
  drawUserList(response.user);
  drawTodoList(response.todo);
}



const onActiveClickHander = () => {
  const items = userAPI.getItems()
  drawUserList(itesm)
}


function init () {
  console.log("init");
  userAPI.getAllUserList()
  .then((userList)=>{
    drawTitle(userList[0].name);
    drawUserButton(userList, userList[0]._id);
    drawTodoList(userList[0]);
  });  
}

init();

function drawTitle(name){
  //console.log("drawTitle");
  //console.log("name is "+name);
  const title = document.querySelector('#user-title');
  title.dataset.username = name;
  document.querySelector('#user-title > span > strong').innerText = name;
}

function drawUserButton(response, clickedID) {
  console.log("drawUserButton");
  console.log(response);
  const buttonDiv = document.getElementById('user-list');
  const userCreateButton = document.querySelector('#user-list > button.ripple.user-create-button');
  for(let i of response){
    
    console.log(i._id);
    const button_= document.createElement('button');
    button_.setAttribute('class', 'ripple');
    button_.innerText = i.name;
    if(i._id === clickedID) button_.setAttribute('class', 'ripple active');

    buttonDiv.insertBefore(button_,userCreateButton);
  }
}

function drawTodoList(user){
  console.log("drawTodoList");
  console.log(user);
}

const userCreateButton = document.querySelector('.user-create-button')
userCreateButton.addEventListener('click', onUserCreateHandler)
