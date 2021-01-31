import { currentUserID, baseurl, userList } from "./ControlUserList.js";
import { reflectUserItems, ajaxGetFunctions } from "./AjaxGet.js";
import { chooseButton } from "./ControlTodoButton.js";


export const ajaxPostFunctions = async (data, type) => {
  let url = baseurl;
  let dataset = {};
  if (type === "username") dataset = { name: data };
  else if (type === "useritem") {
    url += `/${currentUserID}/items/`;
    dataset = { contents: data };
  }
  const option = {
      method:  "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataset),
    };
  
  await fetch(url, option)
    .then((data) => {
      if (!data.ok) throw new Error(data.status);
      return data.json();
    })
    .then((post) => {
      if (type === "username") resetUserList();
      else if (type === "useritem") assembleSingleItem(post);
    })
    .catch(error => console.log(error));
};

const assembleSingleItem = (useritem) => {
  reflectUserItems(useritem);

  if (/(active)/.exec(window.location.href)) chooseButton("active");
  else if (/(completed)/.exec(window.location.href)) chooseButton("completed");
  else chooseButton("all");
};

export const resetUserList = () => {
  userList.innerHTML =
    '<button class="ripple user-create-button">+ 유저 생성</button>';
  ajaxGetFunctions("userlist");
};
