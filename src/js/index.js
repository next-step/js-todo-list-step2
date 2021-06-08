import {userAPI, todoAPI} from "./api/api.js";
import {todoItem} from './component/todoList.js';



const onUserCreateHandler = () => {
  console.log("onUserCreateHandler");
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  let user = {name : userName}
  
  if(userName.length<2) {
    alert("username은 두글자이상이여야합니다");
    return;
  }
  
  userAPI.addUser(user)
  .then((data)=>{
    userAPI.getAllUserItems()
    .then((userList)=>{
      drawTitle(data.name);
      drawUserButton(userList, data._id);
      userAPI.getUserItems(data._id)
        .then((todolist)=> {
          drawTodoList(todolist);
        });
    });  
  }); 
}

// 유저생성시 자동으로 생성된 유저의 탭으로 들어가기
const onUserDeleteHandler = () =>{
  const user = document.querySelector('#user-list > button.ripple.active');
  window.confirm( `정말 ${user.innerText}삭제하시겠습니까?` );
  userAPI.deleteUser(user.dataset.id)
      .then((data)=>{
          if(data ==='"user를 삭제하였습니다."'){
            drawUserButton(data,data._id);
          }
      });
}


const onClickUserHander = (id) => {
  userAPI.getUserItems(id)
  .then((todo) => {
    drawTodoList(todo);
  });
}


function init() {
  userAPI.getAllUserItems()
  .then((userList)=>{
   drawTitle(userList[0].name);
   drawUserButton(userList, userList[0]._id);
    userAPI.getUserItems(userList[0]._id)
    .then((todolist)=> {
      drawTodoList(todolist);
    });
  });
}

init();


function drawTitle(name){
  const title = document.querySelector('#user-title');
  title.dataset.username = name;
  document.querySelector('#user-title > span > strong').innerText = title.dataset.username;
}


function drawUserButton(response, clickedID) {
  const removeDom =  document.querySelectorAll('.user.ripple');
  if(removeDom.length!=0){
    removeDom.forEach(dom => {
      if(dom.dataset.action==undefined){
        dom.remove();
      }
    });
  }
  const buttonDiv = document.getElementById('user-list');
  const userCreateButton = document.querySelector('#user-list > button.ripple.user-create-button');
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
  userButtons.forEach(button => button.addEventListener('click',userSeleteButton));
}


function userSeleteButton(){
  const userButtons = document.querySelectorAll(".user.ripple");
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
  document.querySelector('.todo-list').setAttribute('data-userid',ClickedID);
  document.querySelector('.new-todo').setAttribute('data-userid',ClickedID);
  userAPI.getUserItems(ClickedID)
  .then(todoList => drawTodoList(todoList));
}




function drawTodoList(userTodo){
  let todoList ="";
  let userId =  document.querySelector('.user.ripple.active').dataset.id;
  document.querySelector('.todo-list').setAttribute('data-userid',userId);
  document.querySelector('.new-todo').setAttribute('data-userid',userId);

  userTodo.forEach(todo => {
    todoList += todoItem(todo);
  });
  document.querySelector(".todo-list").innerHTML = todoList;
  //deletebutton 이벤트 추가 
  document.querySelectorAll(".destroy").forEach(deleteButton=> deleteButton.addEventListener("click", ondeleteButtonClick));
  //toggle 버튼 이벤트 추가
  document.querySelectorAll(".toggle").forEach(toggleButton=> toggleButton.addEventListener("click", onToggleButtonClick));
  //더블클릭 이벤트 추가
  document.querySelectorAll('.label').forEach(label => label.addEventListener("dblclick", onEditLabel));
  document.querySelectorAll('.select').forEach(select => select.addEventListener('change',onSelectHandler));
  document.querySelectorAll('.edit').forEach(edit => edit.addEventListener('keyup',oneditKeyup));
  
  // fillter 이벤트 추가
  document.querySelectorAll('.filters > li > a').forEach(li => li.addEventListener('click',fillterTodo));
}

function fillterTodo(){
  document.querySelectorAll('.filters > li > a').forEach(a => {
    let aText = a.getAttribute('class').replace('selected','');
    let selectedText = this.getAttribute('class').replace('selected','');
    
    if(aText ==selectedText ){  
      a.setAttribute("class",aText+' selected');
    }else{
      a.setAttribute('class',aText);
    }  
  });
  showCount();
}

function showCount(){
  let aSelect = document.querySelector('.filters > li > a.selected');
  let selectedName = aSelect.getAttribute('class').replace('selected','').trim(' ');
  //console.log(selectedName);
  let totalNum = document.querySelectorAll('.todo-list >li').length;
  let activeNum =  document.querySelectorAll('.todo-list >li.completed').length;
  if(selectedName =='all'){
     showListCount(totalNum);
  }else if(selectedName =='active'){
    showListCount(totalNum-activeNum);
  }else{
    showListCount(activeNum);
  }
}

function showListCount(listLength){
  const str = document.querySelector('.todo-count > strong');
  console.log(str)
  //console.log(listLength);
  str.innerHTML = listLength;
}

function onSelectHandler(){
  console.log("dfsdfsdfd");
  const selectedValue = this.value;
  if(selectedValue==1){
    const labelvalue = this.parentNode;
    console.log(labelvalue);
    const el_label = this.parentNode.dataset.itemid;
    console.log(el_label);
    this.remove();
    this.parentNode.innerHTML +=  `<span class="chip primary">1순위</span>`;
    

  }else if(selectedValue==2){

  }
}

function onEditLabel(){
  const lis = document.querySelectorAll('.todo-list >li');
  lis.forEach(li =>{
    if(li.classList.value =='editing'){
      if(li.children[1].checked) li.setAttribute("class","completed");
      else  li.setAttribute("class","");
    }
  });
  this.parentNode.parentNode.setAttribute('class','editing');
}

function oneditKeyup(event){
  const userID = document.querySelector('.todo-list').dataset.userid;
  const ItemID = this.parentNode.dataset.id;

  let item ={'contents' : this.value};

  if(event.key === 'Enter'){
    todoAPI.updateItem(userID, ItemID, item)
      .then(data =>{
        userAPI.getUserItems(userID)
        .then((todolist)=> {
          drawTodoList(todolist);
        });
      });
      return;
    }
    if(event.key == 'Escape')
    {
      this.parentNode.classList.remove('editing');
      let ischecked = this.parentNode.children[0].children[0].checked;
      if(ischecked){
        this.parentNode.setAttribute("class","completed");
      }
      return;
  }
}


function onToggleButtonClick(){  
  const userID = document.querySelector('.todo-list').dataset.userid;
  const ItemID = this.parentNode.parentNode.dataset.id;
  
  
  todoAPI.toggleItem(userID, ItemID)
  .then(data => {
    if(Object.keys(data).includes('message')){
      alert("문제발생 : "+error);
      return;
    }else{
      const li = this.parentNode.parentNode;
      const li_completed = li.getAttribute('class');
      if(li_completed==='completed'){
        li.setAttribute('class', '');
      }else{
        li.setAttribute('class', 'completed');
      }
    }
  })
}

function makeTodo(){
  if(window.event.key == 'Enter'){
    if(!newTodoAdd.value ||!newTodoAdd.value.trim()||newTodoAdd.value.length<2)
    {
      alert("내용이 너무 짧습니다.");
      return ; 
    }
    const body = {"contents" :newTodoAdd.value};
    const userid = document.querySelector('.new-todo').dataset.userid;
    todoAPI.addTodo(userid,body)
    .then(data =>{
      userAPI.getUserItems(userid)
      .then((todolist)=> {
        drawTodoList(todolist);
        newTodoAdd.value ="";
      });
    });
  } 
}

function ondeleteButtonClick(){
  const itemId = this.dataset.id;
  const userId = this.parentNode.parentNode.parentNode.dataset.userid;
  todoAPI.deleteTodo(userId,  itemId)
  .then(data =>{
    userAPI.getUserItems(userId)
      .then((todolist)=> {
        drawTodoList(todolist);
      });
  })
}


function clearTodo(){
  const userID = document.querySelector('.todo-list').dataset.userid;
  todoAPI.deleteAllTodo(userID)
  .then(data =>{
    if(data.success){
      userAPI.getUserItems(userID)
      .then((todolist)=> {
        drawTodoList(todolist);
      });
    }
  })
}




const userCreateButton = document.querySelector('.user-create-button')
userCreateButton.addEventListener('click', onUserCreateHandler)


const userDeleteButton = document.querySelector('.user-delete-button')
userDeleteButton.addEventListener('click', onUserDeleteHandler)


const newTodoAdd = document.querySelector('.new-todo');
newTodoAdd.addEventListener('keypress', makeTodo);

const allTodoClear =  document.querySelector('.clear-completed');
allTodoClear.addEventListener('click', clearTodo);

