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
  deletebutton.addEventListener('click', ajaxDeleteAllItem);
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
  ajaxGetUserItems();
  topTitle.innerText = target.innerText;
  todoList.innerHTML = "";
};

const onUserCreateHandler = ({ target }) => {
  if (!target.classList.contains("user-create-button")) return;

  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  if (userName === null) return;
  else if(userName.length === 1) {
    alert('두 글자 이상 입력해주세요!');
    return;
  }
  const userTemplate = document.createElement("button");
  userTemplate.classList.add("ripple");
  userTemplate.innerText = userName;

  let dataset = {
    name: userName,
  };

  ajaxPostUserName(dataset);

  const jsonArray = JSON.stringify(dataset);
  localStorage.setItem(dataset.name, jsonArray);
};

const resetUserList = () => {
  userList.innerHTML =
    '<button class="ripple user-create-button">+ 유저 생성</button>';
  ajaxGetUserList();
};

const onAjaxCreateUserList = (dataset) => {
  const createbutton = document.querySelector(".user-create-button");
  const userTemplate = document.createElement("button");
  userTemplate.classList.add("ripple");
  userTemplate.innerText = dataset.name;
  userTemplate.setAttribute("id", dataset._id);
  userList.insertBefore(userTemplate, createbutton);
};


export const ajaxGetUserList = () => {
fetch("https://js-todo-list-9ca3a.df.r.appspot.com/api/users")
.then((data) => {
if (!data.ok) {
         throw new Error(data.status);
     }
      return data.json();
     })
     .then((post) => {
       const users = post;
       console.log(users);
       for (let i in users) {
         let dataset = {
           _id: users[i]._id,
           name: users[i].name,
           todoList: users[i].todoList,
         };
         onAjaxCreateUserList(dataset);
       }
     })
     .catch((error) => {
       console.log(error);
     });
 };

const ajaxGetUserItems = () => {
  
  todoList.innerHTML = '';
    const url = "https://js-todo-list-9ca3a.df.r.appspot.com/api/users/"
                +currentUserID+"/items/"
    fetch(url)
    .then((data) => {
      if (!data.ok) {
        throw new Error(data.status);
      }
      return data.json();
    })
    .then((post) => {
      const users = post;
      for(let i in users){
        reflectUserItems(users[i]);
      }
      if (/(active)/.exec(window.location.href)) chooseButton("active");
      else if (/(completed)/.exec(window.location.href)) chooseButton("completed");
      else chooseButton("all");
      
    })
    .catch((error) => {
      console.log(error);
    });
};



const reflectUserItems = (item) =>{
    const li = listAssemble(item.contents);
    const checkbox = li.querySelector('.toggle');
    const span = li.querySelector('span.chip');
    const selecter = li.querySelector('select');

    li.setAttribute('id', item._id)
    if(item.isCompleted) {
        li.classList.add('completed');
        checkbox.setAttribute('checked', '');
    }

    if(item.priority!=="NONE"){
        if(item.priority==="FIRST") {
            span.classList.add('primary');
            span.innerText="1순위";
        }
        else if(item.priority==="SECOND"){
            span.classList.add('secondary');
            span.innerText="2순위";
        }
        selecter.style.display = "none";
    }
    else{
        span.style.display="none";
    }  
};



const ajaxPostUserName = (dataset) => {
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataset),
  };

  fetch("https://js-todo-list-9ca3a.df.r.appspot.com/api/users", option)
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

export const ajaxPostItemChange = (item)=>{
    
    let str = item.querySelector('.edit').value;
    const dataset = {
        "contents": str
    };
    const option = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataset)
      };

      const url = "https://js-todo-list-9ca3a.df.r.appspot.com/api/users/"
      +currentUserID+"/items/" + item.getAttribute('id');

  fetch(url, option)
    .then((data) => {
      if (!data.ok) {
        throw new Error(data.status);
      }
      return data.json();
    })
    .then((post) => {
      console.log(post);
      ajaxGetUserItems();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const ajaxPostItemChecked = (item)=>{
    const option = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        }
      };

      const url = "https://js-todo-list-9ca3a.df.r.appspot.com/api/users/"
      +currentUserID+"/items/" + item.getAttribute('id') + "/toggle"

  fetch(url, option)
    .then((data) => {
      if (!data.ok) {
        throw new Error(data.status);
      }
      return data.json();
    })
    .then((post) => {
      console.log(post);
      ajaxGetUserItems();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const ajaxPostItemPriority = (item)=>{
    let tag = 'NONE';
    const span = item.querySelector('span.chip');
    if(span.classList.contains('primary')) tag = 'FIRST';
    else if(span.classList.contains('secondary')) tag = 'SECOND';

    const dataset = {
        "priority":tag
    }
    const option = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataset)
      };

      const url = "https://js-todo-list-9ca3a.df.r.appspot.com/api/users/"
      +currentUserID+"/items/" + item.getAttribute('id') + "/priority"

  fetch(url, option)
    .then((data) => {
      if (!data.ok) {
        throw new Error(data.status);
      }
      return data.json();
    })
    .then((post) => {
      console.log(post);
      ajaxGetUserItems();
    })
    .catch((error) => {
      console.log(error);
    });
};




export const ajaxPostUserItem = (dataset) => {
  console.log(currentUserID);
    const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataset)
      };

      const url = "https://js-todo-list-9ca3a.df.r.appspot.com/api/users/"
      +currentUserID+"/items/"

  fetch(url, option)
    .then((data) => {
      if (!data.ok) {
        throw new Error(data.status);
      }
      return data.json();
    })
    .then((post) => {
      console.log(post);
      ajaxGetUserItems();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const ajaxDeleteItem = (item) =>{

  const option = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  };

  const url = "https://js-todo-list-9ca3a.df.r.appspot.com/api/users/"
    +currentUserID+"/items/" + item.getAttribute('id');

  fetch(url, option)
    .then((data) => {
      if (!data.ok) {
        throw new Error(data.status);
      }
      return data.json();
    })
    .then((post) => {
      console.log(post);
      ajaxGetUserItems();
    })
    .catch((error) => {
      console.log(error);
    });
};

const ajaxDeleteAllItem = () =>{
  if(!confirm('정말로 모두 삭제하시겠습니까?')) return;
  const option = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  };

  const url = "https://js-todo-list-9ca3a.df.r.appspot.com/api/users/"
    +currentUserID+"/items/"

  fetch(url, option)
    .then((data) => {
      if (!data.ok) {
        throw new Error(data.status);
      }
      return data.json();
    })
    .then((post) => {
      console.log(post);
      ajaxGetUserItems();
    })
    .catch((error) => {
      console.log(error);
    });
};

const ajaxDeleteUser = (e) => {
  if (!e.ctrlKey) return;
  if(!confirm('정말 유저를 삭제하시겠습니까?')) return;
  const option = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  };

  const url =
    "https://js-todo-list-9ca3a.df.r.appspot.com/api/users/" + e.target.getAttribute('id');

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



