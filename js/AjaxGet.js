import { todoList, listAssemble } from "./AddNewItem.js";
import { chooseButton } from "./ControlTodoButton.js";
import { currentUserID } from "./ControlUserList.js"

const userList = document.querySelector("#user-list");
const baseurl = "https://js-todo-list-9ca3a.df.r.appspot.com/api/users"

export const ajaxGetFunctions = async (type, data) => {
    let url = baseurl;
    if (type === "useritems") {
      url += `/${currentUserID}/items/`;
      console.log(url);
      todoList.innerHTML = "";
    }
    todoList.innerHTML = showLoadingBar();
  
    await fetch(url)
      .then((data) => {
        if (!data.ok) {
          throw new Error(data.status);
        }
        return data.json();
      })
      .then((post) => {
        todoList.innerHTML ='';
        if (type === "userlist") assembleUserList(post);
        else if(type === "useritems") assembleUserItems(post); 
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



  export const reflectUserItems = (item, type) => {
    let li= listAssemble(item.contents, type);
    
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

  const onAjaxCreateUserList = (dataset) => {
    const createbutton = document.querySelector(".user-create-button");
    const userTemplate = document.createElement("button");
    userTemplate.classList.add("ripple");
    userTemplate.innerText = dataset.name;
    userTemplate.setAttribute("id", dataset._id);
    userList.insertBefore(userTemplate, createbutton);
  };

  const showLoadingBar = () => {
    const loadingtemplate = `<li>
                              <div class="view">
                                <label class="label">
                                  <div class="animated-background">
                                    <div class="skel-mask-container">
                                      <div class="skel-mask"></div>
                                    </div>
                                  </div>
                                </label>
                              </div>
                            </li>`;
    console.log('loading....');
    return loadingtemplate;
  };