import $ from "../../utils/Selector.js";

export default function TodoCount() {

  this.$todoCount = $.single(".todo-count strong");

  this.changeCount = count => {
    this.$todoCount.textContent = count;
  }
}