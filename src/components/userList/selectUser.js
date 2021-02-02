const $userTitle = document.getElementById("user-title");
const $userList = document.getElementById("user-list");
import { userList } from './addUser.js';


export function initSelectUser() {
    $userList.addEventListener("click", onUserSelectHandler); //user title 변경
}


const setUserTitle = (userName) => {
    $userTitle.innerHTML = `<span><strong>${userName}</strong>'s Todo List</span>`;
};

const onUserSelectHandler = ({ target }) => {
    if (target.classList.contains("ripple") && !target.classList.contains("user-create-button")) {
        const $previous = $userList.querySelector(".active");
        $previous.classList.remove("active");
        setUserTitle(target.innerText);
        target.classList.add("active");

        //user의 active값을 선택된 user만 true로
        const selectedUser = userList.find(({ name }) => name === target.innerText);
        userList.forEach((user) => (user.active = false));
        selectedUser.active = true;

        console.log(userList);

    }
};