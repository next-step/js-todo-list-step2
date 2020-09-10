import TodoService from "./services/TodoService.js";
import { userTemplate } from "./template.js";
import {Component} from "./core/Component.js";
import {UserContainer} from "./containers/UserContainer.js";
import {TodoContainer} from "./containers/TodoContainer.js";

class App extends Component {

  render () {
    return `
      <div id="UserContainer"></div>
      <section id="TodoContainer" class="todoapp"></section>
    `;
  }

  componentDidMount () {
    const $userContainer = document.querySelector('#UserContainer');
    const $todoContainer = document.querySelector('#TodoContainer');

    new UserContainer($userContainer);
    new TodoContainer($todoContainer);
  }

}

const $app = document.querySelector('#app');
new App($app);

/*
const onUserCreateHandler = () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
}

// async function TodoApp(){
//   const $todoList = document.querySelector(".todo-list");
//   const users = await TodoService.fetchUsers();
//
//   console.log(users);
//
//   const $userList = document.querySelector("#user-list");
//   const curUser = 0;
//
//   const todoItems = users[curUser];
//
//   console.log(todoItems);
//
//   const userRender = users => {
//     console.log(users);
//     $userList.innerHTML = users.map(userTemplate).join('') + `<button class="ripple user-create-button">+ 유저 생성</button>`;
//     const userCreateButton = document.querySelector('.user-create-button')
//     userCreateButton.addEventListener('click', onUserCreateHandler)
//   }
//
//   userRender(users);
//
// }
//
// TodoApp();}
*/