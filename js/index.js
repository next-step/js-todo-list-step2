fetch('https://js-todo-list-9ca3a.df.r.appspot.com/api/users/')
  .then(response => response.json())
  .then(json => userLoad(json));

function userLoad(users){
  const userList = document.querySelector("#user-list");
  const template = users.map(user => userTemplate(user.name));
  userList.innerHTML = "\n"+template.join("\n")+"\n";
}
function userTemplate(name){
  return `<button class="ripple">${name}</button>`
}
