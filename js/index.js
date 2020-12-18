// import User from "./component/User.js"
// var userList = [];
// var userComponent = new User(userList);

// const onUserCreateHandler = () => {
//   const userName = prompt("추가하고 싶은 이름을 입력해주세요.");

//   if(userName.length >= 2) {
//     this.userComponent.onUserAdd(userName);
//   } else {
//     alert("이름은 최소 2글자 이상이어야합니다.");
//   }
// }

// const userCreateButton = document.querySelector('.user-create-button')
// userCreateButton.addEventListener('click', onUserCreateHandler)
import AppComponent from "./component/App.js"

window.onload = () => {
  const todoApp = new AppComponent();
}