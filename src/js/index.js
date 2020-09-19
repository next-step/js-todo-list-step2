import {observable, observe} from "./core/Observer.js";


const state = observable({
  a: 10,
  b: 20,
  c: 30,
});

observe(() => console.log(`state.a = ${state.a}`));

const onUserCreateHandler = () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
}

const userCreateButton = document.querySelector('.user-create-button')
userCreateButton.addEventListener('click', onUserCreateHandler)