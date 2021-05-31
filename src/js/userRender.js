import * as api from "./api.js";
import { setUserButtonEvent } from "./setUserButtonEvent.js"

async function userRender(){
    await renderUserList();
    await renderUserButton();
    await setUserButtonEvent();
}
async function renderUserList() {
    let userList = await api.getUserList();
    console.log(userList)
    const userListDom = document.querySelector("#user-list");
    userListDom.innerHTML="";
    if(userList.length){
        userList.map(function(v){
            let newButton = document.createElement("button")
            newButton.className = "ripple"
            newButton.textContent = v.name;
            newButton.id = v._id
            userListDom.prepend(newButton)
        })
        userListDom.children[0].classList.add("active")
    }
}

async function renderUserButton() {
    const userListDom = document.querySelector("#user-list");
    let newDiv = document.createElement("div");
    newDiv.innerHTML = `
        <button class="ripple user-create-button" data-action="createUser">
        + 유저 생성
        </button>
        <button class="ripple user-delete-button" data-action="deleteUser">
        삭제 -
        </button>
    `
    userListDom.append(newDiv)
}

export { userRender };