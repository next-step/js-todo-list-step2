function Loader($target) {
  this.$target = $target;

  this.isLoading = false;

  const show = () => {
    this.$target.classList.add("loading");
    this.$target.classList.remove("loaded");
  };

  const hide = () => {
    this.$target.classList.add("loaded");
    this.$target.classList.remove("loading");
  };

  this.setState = (isLoading) => {
    this.isLoading = isLoading;
    this.isLoading ? show() : hide();
    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = `;
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
