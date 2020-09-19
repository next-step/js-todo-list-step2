import { fetcher } from "./fetcher.js"
import fetchParams from "./fetchParams.js"
fetcher(fetchParams.userList,userLoad)

function userLoad(users){
  const userList = document.querySelector("#user-list");
  const template = users.map(user => userTemplate(user.name));
  userList.innerHTML = "\n"+template.join("\n")+"\n";
}
function userTemplate(name){
  return `<button class="ripple">${name}</button>`
}
