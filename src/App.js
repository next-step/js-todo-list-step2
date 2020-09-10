import TodoService from "./services/TodoService.js";
import { userTemplate } from "./template.js";

const onUserCreateHandler = () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
}

async function TodoApp(){
  const $todoList = document.querySelector(".todo-list");
  const users = await TodoService.fetchUsers();

  console.log(users);

  const $userList = document.querySelector("#user-list");
  const curUser = 0;

  const todoItems = users[curUser];

  console.log(todoItems);

  const userRender = users => {
    console.log(users);
    $userList.innerHTML = users.map(userTemplate).join('') + `<button class="ripple user-create-button">+ 유저 생성</button>`;
    const userCreateButton = document.querySelector('.user-create-button')
    userCreateButton.addEventListener('click', onUserCreateHandler)
  }

  userRender(users);

}

TodoApp();