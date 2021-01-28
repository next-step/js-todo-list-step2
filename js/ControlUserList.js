import { todoList, listAssemble } from "./AddNewItem.js";
import { chooseButton } from "./ControlTodoButton.js";

const userList = document.querySelector("#user-list");
const topTitle = document.querySelector("#user-title>span>strong");
const deletebutton = document.querySelector(".clear-completed");

var currentUserID = "";

export const initControlUserList = () => {
  userList.addEventListener("click", onUserCreateHandler);
  userList.addEventListener("click", setCurrentUser);
  userList.addEventListener("click", ajaxDeleteUser);
  deletebutton.addEventListener("click", ajaxDeleteAllItem);
};

const setCurrentUser = ({ target }) => {
  if (target.classList.contains("user-create-button")) return;
  if (!target.classList.contains("ripple")) return;

  const users = document.querySelectorAll("#user-list>.ripple");

  for (let i = 0; i < users.length; i++) {
    if (users[i].classList.contains("active"))
      users[i].classList.remove("active");
  }

  target.classList.add("active");

  currentUserID = target.getAttribute("id");
  ajaxGetFunctions("useritems");
  topTitle.innerText = target.innerText;
  todoList.innerHTML = "";
};

const onUserCreateHandler = ({ target }) => {
  if (!target.classList.contains("user-create-button")) return;

  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  if (userName === null) return;
  else if (userName.length === 1) {
    alert("두 글자 이상 입력해주세요!");
    return;
  }
  const userTemplate = document.createElement("button");
  userTemplate.classList.add("ripple");
  userTemplate.innerText = userName;

  ajaxPostFunctions(userName, 'username');

};

const resetUserList = () => {
  userList.innerHTML =
    '<button class="ripple user-create-button">+ 유저 생성</button>';
    ajaxGetFunctions('userlist');
};

const onAjaxCreateUserList = (dataset) => {
  const createbutton = document.querySelector(".user-create-button");
  const userTemplate = document.createElement("button");
  userTemplate.classList.add("ripple");
  userTemplate.innerText = dataset.name;
  userTemplate.setAttribute("id", dataset._id);
  userList.insertBefore(userTemplate, createbutton);
};

export const ajaxGetFunctions = (type) => {
  let url = "";
  if (type === "userlist") {
    url = "https://js-todo-list-9ca3a.df.r.appspot.com/api/users";
  } else if (type === "useritems") {
    url =
      "https://js-todo-list-9ca3a.df.r.appspot.com/api/users/" +
      currentUserID +
      "/items/";
    todoList.innerHTML = "";
  }

  fetch(url)
    .then((data) => {
      if (!data.ok) {
        throw new Error(data.status);
      }
      return data.json();
    })
    .then((post) => {
      console.log(post);
      if (type === "userlist") assembleUserList(post);
      else assembleUserItems(post);
    })
    .catch((error) => {
      console.log(error);
    });
};

const assembleUserList = (userlist) => {
  for (let i in userlist) {
    let dataset = {
      _id: userlist[i]._id,
      name: userlist[i].name,
      todoList: userlist[i].todoList,
    };
    onAjaxCreateUserList(dataset);
  }
};

const assembleUserItems = (useritems) => {
  for (let i in useritems) {
    reflectUserItems(useritems[i]);
  }
  if (/(active)/.exec(window.location.href)) chooseButton("active");
  else if (/(completed)/.exec(window.location.href)) chooseButton("completed");
  else chooseButton("all");
};

const reflectUserItems = (item) => {
  const li = listAssemble(item.contents);
  const checkbox = li.querySelector(".toggle");
  const span = li.querySelector("span.chip");
  const selecter = li.querySelector("select");

  li.setAttribute("id", item._id);
  if (item.isCompleted) {
    li.classList.add("completed");
    checkbox.setAttribute("checked", "");
  }

  if (item.priority !== "NONE") {
    if (item.priority === "FIRST") {
      span.classList.add("primary");
      span.innerText = "1순위";
    } else if (item.priority === "SECOND") {
      span.classList.add("secondary");
      span.innerText = "2순위";
    }
    selecter.style.display = "none";
  } else {
    span.style.display = "none";
  }
};


export const ajaxPostFunctions = (data, type) =>{
  let url = '';
  let method = '';
  let dataset = {};
  let option = {};
  if(type==="username"){
    method = "POST";
    url = "https://js-todo-list-9ca3a.df.r.appspot.com/api/users";
    dataset = {
      name: data
    };
  }
  else if(type==="useritem"){
    method = "POST";
    url ="https://js-todo-list-9ca3a.df.r.appspot.com/api/users/" + currentUserID +"/items/";
    dataset = {
      contents: data
    };
  }
  else if(type==="changeitem"){
    method = "PUT";
    let str = data.querySelector(".edit").value;
    dataset = {
      contents: str
    };
    url ="https://js-todo-list-9ca3a.df.r.appspot.com/api/users/" +
    currentUserID + "/items/" + data.getAttribute("id")
  }
  else if(type==="checkitem"){
    method = "PUT";
    url = "https://js-todo-list-9ca3a.df.r.appspot.com/api/users/" +
    currentUserID + "/items/" + data.getAttribute("id") + "/toggle";
  }
  else if(type==="prioritem"){
    method = "PUT";
    let tag = "NONE";
    const span = data.querySelector("span.chip");
    if (span.classList.contains("primary")) tag = "FIRST";
    else if (span.classList.contains("secondary")) tag = "SECOND";
    dataset = {
      priority: tag,
    };
    url ="https://js-todo-list-9ca3a.df.r.appspot.com/api/users/" +
    currentUserID + "/items/" + data.getAttribute("id") + "/priority";
  }
  else if(type==="deleteitem"){
    method = "DELETE";
    url ="https://js-todo-list-9ca3a.df.r.appspot.com/api/users/" +
    currentUserID + "/items/" + data.getAttribute("id");
  }

  if(type==="checkitem" || type==="deleteitem") {
    option = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      }
    };
  }
  else {
    option = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataset),
    };
  }
  
  fetch(url, option)
    .then((data) => {
      if (!data.ok) {
        throw new Error(data.status);
      }
      return data.json();
    })
    .then((post) => {
      console.log(post);
      if(type==="username") resetUserList();
      else ajaxGetFunctions("useritems");
    })
    .catch((error) => {
      console.log(error);
    });

};


const ajaxDeleteAllItem = () => {
  if (!confirm("정말로 모두 삭제하시겠습니까?")) return;
  const option = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const url =
    "https://js-todo-list-9ca3a.df.r.appspot.com/api/users/" +
    currentUserID +
    "/items/";

  fetch(url, option)
    .then((data) => {
      if (!data.ok) {
        throw new Error(data.status);
      }
      return data.json();
    })
    .then((post) => {
      console.log(post);
      ajaxGetFunctions("useritems");
    })
    .catch((error) => {
      console.log(error);
    });
};

const ajaxDeleteUser = (e) => {
  if (!e.ctrlKey) return;
  if (!confirm("정말 유저를 삭제하시겠습니까?")) return;
  const option = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const url =
    "https://js-todo-list-9ca3a.df.r.appspot.com/api/users/" +
    e.target.getAttribute("id");

  fetch(url, option)
    .then((data) => {
      if (!data.ok) {
        throw new Error(data.status);
      }
      return data.json();
    })
    .then((post) => {
      console.log(post);
      resetUserList();
    })
    .catch((error) => {
      console.log(error);
    });
};
