import { loadingViewHTML } from '../utils/template.js';

function LoadingView({ $target }) {
  this.init = () => {
    this.$target = $target;
    this.isLoading = false;

    this.render();
  };

  this.setState = (nextState) => {
    this.isLoading = nextState;

    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = this.isLoading ? loadingViewHTML() : '';
  };
  this.init();
}

export default LoadingView;
