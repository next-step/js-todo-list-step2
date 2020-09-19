import {observable, observe} from "./core/Observer.js";


const state = observable({
  a: 20,
  b: 30
});

const render = () => console.log(`state.a = ${state.a}`);

observe(state, render);

state.a = 10;
state.a = 20;
state.a = 30;
state.b = 10;
state.b = 20;
state.b = 30;

const onUserCreateHandler = () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
}

const userCreateButton = document.querySelector('.user-create-button')
userCreateButton.addEventListener('click', onUserCreateHandler)