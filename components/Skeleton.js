export default function Skeleton({ elementId }) {
  this.state = {
    isLoading: false,
  };
  this.$skeleton = document.querySelector(`.${elementId}`);

  this.render = () => {
    this.$skeleton.innerHTML = this.state.isLoading
      ? `
      <li>
        <div class="view">
          <label class="label">
            <div class="animated-background">
              <div class="skel-mask-container">
                <div class="skel-mask"></div>
              </div>
            </div>
          </label>
        </div>
      </li>
    `
      : "";

    this.setState = (isLoading) => {
      this.state.isLoading = isLoading;
      this.render();
    };
  };
}
