import {loadingBarTemplate} from "../utils/templates.js";

function LoadingBar() {
  let $loadingBar = document.querySelector(".todo-list");

  this.loading = () => {
    $loadingBar.innerHTML=loadingBarTemplate();
  };
}

export const $loadingBar = new LoadingBar();
