import { currentUserID, baseurl } from "./ControlUserList.js";
import { ajaxGetFunctions } from "./AjaxGet.js";
import { resetUserList } from "./AjaxPost.js"

export const ajaxDeleteFunctions = async (data, type) => {
    let url = baseurl;
    if (type === "deleteitem") {
      url += `/${currentUserID}/items/${data.getAttribute("id")}`;
    }
    else {
      if (!confirm("정말로 모두 삭제하시겠습니까?")) return;
      url += `/${currentUserID}/items/`;
    }
    
    const option = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    await fetch(url, option)
      .then((data) => {
        if (!data.ok) {
          throw new Error(data.status);
        }
        return data.json();
      })
      .then((post) => {
        if (type !== "deleteitem") ajaxGetFunctions("useritems");
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
        resetUserList();
      })
      .catch((error) => {
        console.log(error);
      });
  };