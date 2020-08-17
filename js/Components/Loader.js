import { isFunction } from "../utils.js";

function Loader($target, eventHandler) {
  /*
  if (
    !eventHandler ||
    !isFunction(eventHandler.onShow) ||
    !isFunction(eventHandler.onHide)
  ) {
    throw new Error("Wrong EventHandler");
  }
  */

  this.isLoading = false;

  const show = () => {
    $target.classList.remove("loaded");
    $target.classList.add("loading");
  };

  const hide = () => {
    $target.classList.remove("loading");
    $target.classList.add("loaded");
  };

  this.setState = (isLoading) => {
    this.isLoading = isLoading;
    this.isLoading ? show() : hide();
    this.render();
  };

  this.render = () => {
    $target.innerHTML = `
      <div class="loadingio-spinner-spin-3vg4xkx8ysu">
        <div class="ldio-2h4zz00rk2p">
          <div><div></div></div>
          <div><div></div></div>
          <div><div></div></div>
          <div><div></div></div>
          <div><div></div></div>
          <div><div></div></div>
          <div><div></div></div>
          <div><div></div></div>
        </div>
      </div>
    `;
  };
  this.render();
}

export default Loader;
