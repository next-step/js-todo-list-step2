import { todoCountTemplate, errorCallTemplate } from "../utils/template.js";

export default function TodoCount({ elementId, todoCount }) {
  this.todoCount = todoCount;
  this.init = () => {
    if (!(this instanceof TodoCount)) {
      throw new Error(errorCallTemplate);
    }
    this.$todoCount = document.querySelector(`.${elementId}`);
  };
  this.render = () => {
    this.$todoCount.innerHTML = todoCountTemplate(this.todoCount);
  };
  this.setState = (todoCount) => {
    this.todoCount = todoCount;
    this.render();
  };
  this.init();
  this.render();
}
