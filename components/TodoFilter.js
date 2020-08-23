import { ALL, COMPLETED, ACTIVE, SELECTED, NOTLI } from "../utils/data.js";
import { errorCallTemplate } from "../utils/template.js";

export default function TodoFilter({ elementId, filterType, filterTodo }) {
  this.state = {
    filterType: filterType,
  };
  this.init = () => {
    if (!(this instanceof TodoFilter)) {
      throw new Error(errorCallTemplate);
    }
    this.$todoFilter = document.querySelector(`.${elementId}`);
    this.filterTodo = filterTodo;
    this.bindEventListener();
  };
  this.switchFilter = (type) => {
    if (type === ACTIVE) {
      this.filterTodo({
        type: ACTIVE,
      });
    } else if (type === COMPLETED) {
      this.filterTodo({
        type: COMPLETED,
      });
    } else {
      this.filterTodo({
        type: ALL,
      });
    }
  };
  this.clickHandler = (evt) => {
    if (
      evt.target.tagName === "A" &&
      !evt.target.classList.contains(SELECTED)
    ) {
      this.switchFilter(evt.target.hash.split("/")[1]);
    }
  };
  this.bindEventListener = () => {
    this.$todoFilter.addEventListener("click", this.clickHandler);
  };
  this.render = () => {
    [...this.$todoFilter.childNodes].forEach((el) => {
      const currentHash =
        el.tagName === "LI" ? el.childNodes[1].hash.split("/")[1] : NOTLI;
      if (currentHash !== NOTLI && currentHash !== this.state.filterType) {
        el.childNodes[1].classList.remove(SELECTED);
      } else if (
        currentHash !== NOTLI &&
        currentHash === ("" || this.state.filterType) &&
        !el.childNodes[1].classList.contains(SELECTED)
      ) {
        el.childNodes[1].classList.add(SELECTED);
      }
    });
  };
  this.setState = (type) => {
    this.state.filterType = type;
    this.render();
  };
  this.init();
}
