import {userAPI, todoAPI, storage} from "./api/api.js";
import {loadingBar, todoItem} from './component/todoList.js';




const onUserCreateHandler = () => {
  console.log("onUserCreateHandler");
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  let user = {name : userName}
  userAPI.addUser(user)
  .then((data)=>{
    console.log("데이터가 추가되었습니다."+ data);
    userAPI.getAllUserItems()
    .then((userList)=>{
      drawTitle(data.name);
      drawUserButton(userList, data._id);
      drawTodoList(data);
    });  
  });
 
}

// 유저생성시 자동으로 생성된 유저의 탭으로 들어가기

const onUserDeleteHandler = () =>{
  console.log("onUserDeleteHandler");
  const user = document.querySelector('#user-list > button.ripple.active');
  console.log(user.dataset.id);
  window.confirm( `정말 ${user.innerText}삭제하시겠습니까?` );
  userAPI.deleteUser(user.dataset.id)
      .then((data)=>{
          console.log(data);
          if(data ==='"user를 삭제하였습니다."'){
            drawUserButton(data,data._id);
          }
      });
  // drawUserList(response.user);
  // drawTodoList(response.todo);
}


console.log( loadingBar());
console.log( todoItem());

const onClickUserHander = (id) => {
  userAPI.getUserItems(id)
  .then((todo) => {
    drawTodoList(todo);
    console.log(todo);
  });
}
//onClickUserHander("J-BuG57Uc");

function init() {
  console.log("init");
  userAPI.getAllUserItems()
  .then((userList)=>{
    console.log("init userList[0]"+ userList[0].name);
    drawTitle(userList[0].name);
    drawUserButton(userList, userList[0]._id);
    //drawTodoList(userList[0]);
  });  
}

init();

function drawTitle(name){
  console.log("drawTitle");
  console.log("name is "+name);
  const title = document.querySelector('#user-title');
  console.log( title.dataset.username);
  title.dataset.username = name;
  console.log( title.dataset.username);
  document.querySelector('#user-title > span > strong').innerText = title.dataset.username;
}


function drawUserButton(response, clickedID) {
  const removeDom =  document.querySelectorAll('.user.ripple');
  // console.log(removeDom);
  // console.log(removeDom.length); 
  if(removeDom.length!=0){
    console.log("들오왓니")
    removeDom.forEach(dom => {
      console.log("dom.dataset.action");
      console.log(dom.dataset.action);
      if(dom.dataset.action==undefined){
        dom.remove();
      }
    });
  }
  

  console.log("drawUserButton");
  console.log(response);
  const buttonDiv = document.getElementById('user-list');
  const userCreateButton = document.querySelector('#user-list > button.ripple.user-create-button');
  console.log(Object.keys(response).length);//사이즈가 잘 안나옴 
  
  // if(Object.keys(response).length===3){
  //   const active_button = document.querySelector('#user-list > button.ripple.active');
  //   //#user-list > button:nth-child(7)
  //   active_button.setAttribute('class', 'ripple');
  //   const button_= document.createElement('button');
  //   button_.setAttribute('class', 'ripple active');
  //   button_.setAttribute("data-id",response._id);
  //   button_.innerText = response.name;
  //   buttonDiv.insertBefore(button_,userCreateButton);
  //   return ;
  // }


  console.log("1개이상"+Object.keys(response).length);
  for(let i of response){
    const button_= document.createElement('button');
    button_.setAttribute('class', 'user ripple');
    button_.setAttribute("data-id",i._id);
    button_.innerText = i.name;
    
    if(i._id === clickedID){
      button_.setAttribute('class', 'user ripple active');
      drawTitle(i.name);
    }
     
    
    console.log(button_);
    buttonDiv.insertBefore(button_,userCreateButton);
  }
  const userButtons = document.querySelectorAll(".user.ripple");
  console.log(userButtons);
  userButtons.forEach(button => button.addEventListener('click',userSeleteButton));
}

function userSeleteButton(){
  console.log(this);
  const userButtons = document.querySelectorAll(".user.ripple");
  console.log(userButtons);
  userButtons.forEach(button =>{
    button.setAttribute("class","user ripple");

    if(button.dataset.id === this.dataset.id) {
      button.setAttribute("class","user ripple active");
      drawTitle(button.innerText);
    }
  });
  drawTodoList(this.dataset.id);
}

function drawTodoList(user){
  console.log("drawTodoList");
  console.log(user);
  const li_list = document.getElementsByClassName("todo-list");
}

const userCreateButton = document.querySelector('.user-create-button')
userCreateButton.addEventListener('click', onUserCreateHandler)


const userDeleteButton = document.querySelector('.user-delete-button')
userDeleteButton.addEventListener('click', onUserDeleteHandler)
