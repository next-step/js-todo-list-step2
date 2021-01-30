import { currentUserID, baseurl } from "./ControlUserList.js";

export const ajaxPutFunctions = async(data, type) => {
    let url = baseurl;
    let dataset = {};
  
    if (type === "changeitem") {
      let str = data.querySelector(".edit").value;
      dataset = { contents: str };
      url += `/${currentUserID}/items/${data.getAttribute("id")}`;
    } else if (type === "checkitem") {
      url += `/${currentUserID}/items/${data.getAttribute("id")}/toggle`;
    } else if (type === "prioritem") {
      let tag = "NONE";
      const span = data.querySelector("span.chip");
      if (span.classList.contains("primary")) tag = "FIRST";
      else if (span.classList.contains("secondary")) tag = "SECOND";
      dataset = { priority: tag };
      url += `/${currentUserID}/items/${data.getAttribute("id")}/priority`;
    }
     const option = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataset),
      };
  
    await fetch(url, option)
      .then((data) => {
        if (!data.ok) {
          throw new Error(data.status);
        }
        return data.json();
      })
      .then((post) => {
      })
      .catch((error) => {
        console.log(error);
      });
  
  };