export default function TodoCount(countContainerEl, todoApp) {
  const countEl = countContainerEl.querySelector(".todo-count");
  const filtersEl = countContainerEl.querySelector(".filters");
  const filterEls = Array.from(filtersEl.querySelectorAll("a"));
  const buttonEl = countContainerEl.querySelector(".clear-completed");

  const checkFilterEl = ({ classList }) =>
    Array.from(classList).some((className) =>
      ["all", "active", "completed"].includes(className)
    );

  this.setFilter = (event) => {
    if (!checkFilterEl(event.target)) {
      return;
    }

    filterEls
      .filter((el) => el === event.target)
      .forEach(({ classList }) =>
        todoApp.setFilter(
          classList.contains("all") ? null : classList.contains("completed")
        )
      );

    event.preventDefault();
  };

  this.deleteAllTodos = () => {
    if (!confirm(`정말로 모두 삭제하시겠습니까?`)) {
      return;
    }

    todoApp.deleteAllTodos();
  };

  const checkFilterElSelected = ({ classList }) =>
    (todoApp.filter === null && classList.contains("all")) ||
    (todoApp.filter === false && classList.contains("active")) ||
    (todoApp.filter === true && classList.contains("completed"));

  this.render = (todos) => {
    countEl.innerHTML = `총 <strong>${todos.length}</strong> 개`;

    filterEls.forEach((filterEl) => {
      const { classList } = filterEl;
      classList.remove("selected");

      if (!checkFilterElSelected(filterEl)) {
        return;
      }

      classList.add("selected");
    });
  };

  filtersEl.addEventListener("click", this.setFilter);
  buttonEl.addEventListener("click", this.deleteAllTodos);
}
