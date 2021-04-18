import {$,$$, utils} from './util.js'
import {userApi} from './api.js'
import {Message as msg} from './constant.js'
import {todoListComponent} from './todoList.js'

let user, userList;

const addEventListener = () => {
  console.log('addEventListener')
  $$('.ripple').forEach(button=>{
    if(button.classList.contains('user-create-button') || button.classList.contains('user-delete-button')) return
    button.addEventListener('click', onUserClickHandler)
  })
  $('.user-create-button').addEventListener('click', onUserCreateHandler)
}

const onUserClickHandler = (e) => {
  console.log('onUserClickHandler')
  let clickedUser = e.target;
  setUserButtonStatus(clickedUser)
  getUser(clickedUser.id)
  
}

const setUserButtonStatus = (userElement) => {
  $$('.ripple').forEach(button => {
    if(button.classList.contains('active')) button.classList.toggle('active')
  })
  userElement.classList.add('active')
}

const onUserCreateHandler = () => {
  console.log('onUserCreateHandler')
  const userName = prompt(msg.INPUT_USER_NAME_FOR_ADD);
  if(!utils.isValid2MoreWord(userName)) {
    alert(msg.MUST_2_MORE_WORD)
    return
  }
  addUser(userName);
}

const setUserInfoAndTodoList = (user) => {
  $('#user-title').setAttribute('data-username', user.name);
  $('#user-title').firstElementChild.firstElementChild.textContent = user.name;
  todoListComponent(user.todoList);
}

const drawUserList = (userList) => {
  let tag = '';
  console.log(user)
  user = !user?userList[0]:user;
  console.log(user)
  Array.from(userList).forEach(eachUser=>{
    // console.log(user)
    tag += `<button class="ripple ${eachUser._id===user._id?'active':''}" id="${eachUser._id}">${eachUser.name}</button>`
  })
  $('#user-list').innerHTML = tag + drawUserAddAndDeleteButton()
  // $('#user-list').children[0].classList.add('active')
  addEventListener();
  
  setUserInfoAndTodoList(user);
}

const drawUserAddAndDeleteButton = () => {
  return `<button class="ripple user-create-button" data-action="createUser">
            + 유저 생성
          </button>
          <button class="ripple user-delete-button" data-action="deleteUser">
            삭제 -
          </button>`
}

const addUser = (userName) => {
  console.log('add user')
  userApi()
    .addUser(userName)
    .then(response=>{
      user = response
      console.log(user)
    })
    .then(getUserList)
    .then(drawUserList(userList))
}

const getUserList = () => {
  console.log('get users')
  userApi()
    .getUsers()
    .then(response=>{
      userList = response;
      drawUserList(userList)
    })
}

const getUser = (userId) => {
  console.log('get user')
  userApi()
    .getUser(userId)
    .then(response=>{
      user = response;
      console.log(user);
      setUserInfoAndTodoList(user);
    })
}

export const userComponent = () => {
  const userInit = () => {
    console.log('userInit')
    getUserList();
  }

  return { userInit }
}

