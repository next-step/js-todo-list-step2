import { getUserList } from "./getUserList.js";


async function userRender(){
    let userList = await getUserList();
    userList.map(function(v){
        const userListDom = document.querySelector("#user-list");
        let newButton = document.createElement("button")
        newButton.className = "ripple"
        if(v.name === "young"){
            newButton.className = "ripple active"
        }
        newButton.textContent = v.name;
        userListDom.prepend(newButton)
    })
}

// userList.map(function(v){
//     const userListDom = document.querySelector("#user-list");
//     let userlist = document.createElement("user-list-item");
//     let newButton = document.createElement("button")
//     newButton.className = "ripple"
//     newButton.textContent = v.name;
//     userlist.append(newButton)
//     userListDom.append(userlist)
// })
export { userRender };