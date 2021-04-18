import {$,$$, utils} from './util.js'
import {userStore} from './store.js'
import {Message as msg} from './constant.js'

const $user = $('#user-list');
let user, userList;

const addEventListner = () => {
  console.log('addEventListner')
  $$('.ripple').forEach(button=>{
    if(button.classList.contains('user-create-button') || button.classList.contains('user-delete-button')) return
    button.addEventListener('click', onUserClickHandler)
  })
  $('.user-create-button').addEventListener('click', onUserCreateHandler)
}

const onUserClickHandler = (e) => {
  console.log('onUserClickHandler')
  let clickedUser = e.target;
  $$('.ripple').forEach(button => {
    // console.log(button)
    if(button.classList.contains('active')) button.classList.toggle('active')
  })
  clickedUser.classList.add('active')
}

const onUserCreateHandler = () => {
  console.log('onUserCreateHandler')
  const userName = prompt(msg.INPUT_USER_NAME_FOR_ADD);
  if(!utils.isValid2MoreWord(userName)) {
    alert(msg.MUST_2_MORE_WORD)
    return
  }
  user().addUser(userName);
}

const drawUserList = (userList) => {
  let tag = '';
  Array.from(userList).forEach(user=>{
    tag += `<button class="ripple">${user.name}</button>`
  })
  $('#user-list').innerHTML = tag + drawUserAddDeleteButton()
  $('#user-list').children[0].classList.add('active')
  addEventListner();

}

const drawUserAddDeleteButton = () => {
  return `<button class="ripple user-create-button" data-action="createUser">
            + 유저 생성
          </button>
          <button class="ripple user-delete-button" data-action="deleteUser">
            삭제 -
          </button>`
}

export const users = () => {
  const addUser = (userName) => {
    console.log('add user')
    userStore()
      .addUser(userName)
      .then(response=>{
        console.log('rst=',response.name)
      });
    getUserList();
  }

  const getUserList = () => {
    console.log('get users')
    userStore()
      .getUsers()
      .then(response=>{
        userList = response;
        drawUserList(userList)
      })
  }

  const getUser = (userId) => {
    console.log('get user')
    userStore()
      .getUser(userId)
      .then(response=>{
        user = response;
        console.log(user);
      })
  }
  return { addUser, getUserList }
}

users().getUserList()