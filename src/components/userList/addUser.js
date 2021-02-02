const $userList = document.getElementById("user-list");
const $userCreateButton = document.querySelector(".user-create-button");
export const userList = [{ name: "yeewon", active: true }];

export function initAddUser() {
    $userCreateButton.addEventListener("click", onUserCreateHandler); //user 생성
}

const onUserCreateHandler = () => {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
    if (userName === null) return;

    //새로운 user button 삽입
    const $inputHTML = document.createElement("button");
    $inputHTML.innerHTML = userName;
    $inputHTML.setAttribute("class", "ripple");
    $userList.insertBefore($inputHTML, $userCreateButton);

    //users 배열에 삽입 
    const user = {
        name: "",
        active: ""
    };
    user.name = userName;
    user.active = false;

    userList.push(user);

    console.log(userList);

};
