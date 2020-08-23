import { skeletonTemplate, errorCallTemplate } from "../utils/template.js";

export default function Skeleton({ elementId }) {
  this.state = {
    isLoading: false,
  };
  this.init = () => {
    if (!(this instanceof Skeleton)) {
      throw new Error(errorCallTemplate);
    }
    this.$skeleton = document.querySelector(`.${elementId}`);
  };

  this.render = () => {
    this.$skeleton.innerHTML = this.state.isLoading ? skeletonTemplate : "";

    this.setState = (isLoading) => {
      this.state.isLoading = isLoading;
      this.render();
    };
  };

  this.init();
}
