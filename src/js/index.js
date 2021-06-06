import {userAPI, todoAPI, storage} from "./api/api.js";
import {todoItem} from './component/todoList.js';




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
      userAPI.getUserItems(data._id)
        .then((todolist)=> {
          console.log(todolist);
          drawTodoList(todolist);
        });
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
            // userAPI.getUserItems(data._id)
            // .then((todolist)=> {
            //   console.log(todolist);
            //   drawTodoList(todolist);
            // });
          }
      });
  // drawUserList(response.user);
  // drawTodoList(response.todo);
}


//console.log( loadingBar());
//console.log( todoItem());

const onClickUserHander = (id) => {
  userAPI.getUserItems(id)
  .then((todo) => {
    drawTodoList(todo);
  });
}
//onClickUserHander("J-BuG57Uc");



function init() {
  //console.log("init");
  userAPI.getAllUserItems()
  .then((userList)=>{
   console.log("init userList[0]"+ userList[0]);
   drawTitle(userList[0].name);
   drawUserButton(userList, userList[0]._id);
    userAPI.getUserItems(userList[0]._id)
    .then((todolist)=> {
      console.log(todolist);
      drawTodoList(todolist);
    });
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
    //console.log("들오왓니")
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
  //console.log(Object.keys(response).length);//사이즈가 잘 안나옴 

  //console.log("1개이상"+Object.keys(response).length);
  for(let i of response){
    const button_= document.createElement('button');
    button_.setAttribute('class', 'user ripple');
    button_.setAttribute("data-id",i._id);
    button_.innerText = i.name;
    
    if(i._id === clickedID){
      button_.setAttribute('class', 'user ripple active');
      drawTitle(i.name);
    }
    buttonDiv.insertBefore(button_,userCreateButton);
  }
  const userButtons = document.querySelectorAll(".user.ripple");
  //console.log(userButtons);
  userButtons.forEach(button => button.addEventListener('click',userSeleteButton));
}





function userSeleteButton(){
  console.log(this);
  const userButtons = document.querySelectorAll(".user.ripple");
  console.log(userButtons);
  let ClickedID ="";
  userButtons.forEach(button =>{
    button.setAttribute("class","user ripple");

    if(button.dataset.id === this.dataset.id) {
      ClickedID = button.dataset.id;
      button.setAttribute("class","user ripple active");
      drawTitle(button.innerText);
      console.log("button.dataset.id;"+ button.dataset.id);
    }
  });
  console.log(ClickedID);
  document.querySelector('.todo-list').setAttribute('data-userid',ClickedID);
  document.querySelector('.new-todo').setAttribute('data-userid',ClickedID);
  userAPI.getUserItems(ClickedID)
  .then(todoList => drawTodoList(todoList));
}








function drawTodoList(userTodo){
  let todoList ="";
  console.log("drawTodoList");
  console.log(userTodo.todoList);
  let userId =  document.querySelector('.user.ripple.active').dataset.id;
  console.log('닭'+ userId);
  document.querySelector('.todo-list').setAttribute('data-userid',userId);
  document.querySelector('.new-todo').setAttribute('data-userid',userId);

  //todoList +=loadingBar;
  userTodo.forEach(todo => {
    //console.log(todo);
    console.log(todoItem(todo));
    todoList += todoItem(todo);
    //console.log(todoList);
  });
  console.log("todoList최종"+todoList);
  document.querySelector(".todo-list").innerHTML = todoList;
  //deletebutton 이벤트 추가 
  document.querySelectorAll(".destroy").forEach(deleteButton=> deleteButton.addEventListener("click", ondeleteButtonClick));
  //toggle 버튼 이벤트 추가
  document.querySelectorAll(".toggle").forEach(toggleButton=> toggleButton.addEventListener("click", onToggleButtonClick));
  
}










function onToggleButtonClick(){  
  console.log("onToggleButtonClick");
  const userID = document.querySelector('.todo-list').dataset.userid;
  const ItemID = this.parentNode.parentNode.dataset.id;
  console.log(ItemID);
  
  
  todoAPI.toggleItem(userID, ItemID)
  .then(data => {
    if(Object.keys(data).includes('message')){
      alert("문제발생 : "+error);
      return;
    }else{

      this.parentNode.parentNode.setAttribute("class", 'completed');
    }
  })

  console.log("onToggleButtonClick");
  console.log(this.parentNode.parentNode);
}

function makeTodo(){
  if(window.event.key == 'Enter'){
    console.log("enter발생");
    if(!newTodoAdd.value ||!newTodoAdd.value.trim())
    {
      alert("빈 값입니다.");
      return ; 
    }
    //{name : userName}
    const body = {"contents" :newTodoAdd.value};
    const userid = document.querySelector('.new-todo').dataset.userid;
    todoAPI.addTodo(userid,body)
    .then(data =>{
      console.log(data)
      userAPI.getUserItems(userid)
      .then((todolist)=> {
        console.log(todolist);
        drawTodoList(todolist);
        newTodoAdd.value ="";
      });
    });
  }
 
}

//	/api/users/:userId/items/:itemId
function ondeleteButtonClick(){
  console.log("ondeleteButtonClick");
  const itemId = this.dataset.id;
  const userId = this.parentNode.parentNode.parentNode.dataset.userid;
  todoAPI.deleteTodo(userId,  itemId)
  .then(data =>{
    console.log(data);
    userAPI.getUserItems(userId)
      .then((todolist)=> {
        console.log(todolist);
        drawTodoList(todolist);
      });
  })
}


function onAllDeleteButtonClick(){
  console.log("ondeleteButtonClick");
  
}


const userCreateButton = document.querySelector('.user-create-button')
userCreateButton.addEventListener('click', onUserCreateHandler)


const userDeleteButton = document.querySelector('.user-delete-button')
userDeleteButton.addEventListener('click', onUserDeleteHandler)


const newTodoAdd = document.querySelector('.new-todo');
newTodoAdd.addEventListener('keypress', makeTodo);

