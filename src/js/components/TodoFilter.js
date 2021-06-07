import { $ } from "../lib/util.js";

class TodoFilter {
  constructor({ filtering }) {
    this.filtering = filtering;
    this.init();
  }

  init() {
    this.registerEventListener();
  }

  removeSelectedClass = () => {
    const filterButtons = $(".filters").querySelectorAll("a");

    filterButtons.forEach((filter) => {
      filter.classList.remove("selected");
    });
  };

  addSelectedClass = (target) => {
    target.classList.add("selected");
  };

  registerEventListener() {
    const activeButton = $(".filters").querySelector(".active");
    const completedButton = $(".filters").querySelector(".completed");
    const allButton = $(".filters").querySelector(".all");

    allButton.addEventListener("click", () => {
      this.removeSelectedClass();
      this.addSelectedClass(allButton);
      this.filtering("all");
    });
    activeButton.addEventListener("click", () => {
      this.removeSelectedClass();
      this.addSelectedClass(activeButton);
      this.filtering("active");
    });

    completedButton.addEventListener("click", () => {
      this.removeSelectedClass();
      this.addSelectedClass(completedButton);
      this.filtering("completed");
    });
  }
}
export default TodoFilter;
