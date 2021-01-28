import { currentUserID } from "./ControlUserList.js";
import { reflectUserItems } from "./AjaxGet.js"
import { chooseButton } from "./ControlTodoButton.js";

const baseurl = "https://js-todo-list-9ca3a.df.r.appspot.com/api/users"

export const ajaxPostFunctions = async (data, type) => {
  let url = baseurl;
  let method = "";
  let dataset = {};
  let option = {};
  if (type === "username") {
    method = "POST";
    dataset = {
      name: data,
    };
  } else if (type === "useritem") {
    method = "POST";
    url +=`/${currentUserID}/items/`;

    dataset = {
      contents: data,
    };
  } else if (type === "changeitem") {
    method = "PUT";
    let str = data.querySelector(".edit").value;
    dataset = {
      contents: str,
    };
    url +=`/${currentUserID}/items/${data.getAttribute("id")}`;
  } else if (type === "checkitem") {
    method = "PUT";
    url += `/${currentUserID}/items/${data.getAttribute("id")}/toggle`;
  } else if (type === "prioritem") {
    method = "PUT";
    let tag = "NONE";
    const span = data.querySelector("span.chip");
    if (span.classList.contains("primary")) tag = "FIRST";
    else if (span.classList.contains("secondary")) tag = "SECOND";
    dataset = {
      priority: tag,
    };
    url +=`/${currentUserID}/items/${data.getAttribute("id")}/priority`;
  } else if (type === "deleteitem") {
    method = "DELETE";
    url +=`/${currentUserID}/items/${data.getAttribute("id")}`;
  }

  if (type === "checkitem" || type === "deleteitem") {
    option = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };
  } else {
    option = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataset),
    };
  }

  await fetch(url, option)
    .then((data) => {
      if (!data.ok) {
        throw new Error(data.status);
      }
      return data.json();
    })
    .then((post) => {
      console.log(post);
      if (type === "username") resetUserList();
      else if (type === "useritem") assembleSingleItem(post, "add");
      else {
        assembleSingleItem(post, "change");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const assembleSingleItem = (useritem, type) => {
  reflectUserItems(useritem, type);

  if (/(active)/.exec(window.location.href)) chooseButton("active");
  else if (/(completed)/.exec(window.location.href)) chooseButton("completed");
  else chooseButton("all");
};

export const ajaxDeleteAllItem = async () => {
  if (!confirm("정말로 모두 삭제하시겠습니까?")) return;
  const option = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const url = `${baseurl}/${currentUserID}/items/`;

  await fetch(url, option)
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

export const ajaxDeleteUser = async (e) => {
  if (!e.ctrlKey) return;
  if (!confirm("정말 유저를 삭제하시겠습니까?")) return;
  const option = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const url = `${baseurl}/${e.target.getAttribute("id")}`;

  await fetch(url, option)
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

const resetUserList = () => {
  userList.innerHTML =
    '<button class="ripple user-create-button">+ 유저 생성</button>';
  ajaxGetFunctions("userlist");
};
