import {observable, observe} from "./core/Observer.js";


const state = observable({
  a: 20
});

const render = () => console.log(`state.a = ${state.a}`);

observe(state, render);

const onUserCreateHandler = () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
}

const userCreateButton = document.querySelector('.user-create-button')
userCreateButton.addEventListener('click', onUserCreateHandler)