import { errorCallTemplate, todoErrorTemplate } from "../utils/template.js";

export default function TodoError({ elementId, error }) {
  this.state = {
    error,
  };
  this.init = () => {
    if (!(this instanceof TodoError)) {
      throw new Error(errorCallTemplate);
    }
    this.$todoError = document.querySelector(`.${elementId}`);
  };

  this.setState = (err) => {
    this.state.error = err;
    this.render();
  };

  this.render = () => {
    this.$todoError.innerHTML = todoErrorTemplate(this.state.error);
  };

  this.init();
}
