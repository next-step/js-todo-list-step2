function TodoList(
  $target,
  todoItems,
  { deleteTodo, toggleTodo, editTodoContents }
) {
  this.$target = $target;
  this.state = {
    todoItems,
  };
  this.deleteTodo = deleteTodo;

  this.setState = (todoItems) => {
    this.state.todoItems = todoItems;
    this.render();
  };

  this.render = () => {
    const selectTemplate = (priority) => `
      <select class="chip select">
        <option value="0" ${priority === 0 ? "selected" : ""}>순위</option>
        <option value="1" ${priority === 1 ? "selected" : ""}>1순위</option>
        <option value="2" ${priority === 2 ? "selected" : ""}>2순위</option>
      </select>
    `
    this.$target.innerHTML = `
    ${this.state.todoItems
      .map(({ _id, contents, isCompleted, priority }) =>
           `
            <li data-id=${_id} class=${isCompleted ? "completed" : ""}>
                <div class="view">
                    <input class="toggle" type="checkbox" ${isCompleted ? "checked": ""}/>
                    <label class="label">
                      ${selectTemplate(priority)}
                      <span class="contents">${contents}</span>
                    </label>
                    <button class="destroy"></button>
                </div>
                <input class="edit"/>
            </li>`
      )
      .join("")}
    `;
  };

  this.initEventListeners = () => {
    const clickHandler = (evt) => {
      if (evt.target.tagName === "BUTTON") {
        this.deleteTodo(evt.target.closest("li").dataset.id);
      }
    };

    const onChangeHandler = (evt) => {
      console.log(evt);
      if (
        evt.target.tagName === "INPUT" &&
        evt.target.classList.contains("toggle")
      ) {
        toggleTodo(evt.target.closest("li").dataset.id);
      }
    };

    const onDblclickHandler = (evt) => {
      if (
        evt.target.classList.contains("label") ||
        evt.target.classList.contains("contents")
      ) {
        const $listElem = evt.target.closest("li");
        $listElem.classList.add("editing");
        const $editElem = $listElem.querySelector(".edit");
        const textContent = $listElem.querySelector("span").textContent;
        $editElem.value = textContent;

        $editElem.focus();
        $editElem.setSelectionRange(
          $editElem.value.length,
          $editElem.value.length
        );
      }
    };

    const keyDownHandler = (evt) => {
      if (
        evt.target.tagName === "INPUT" &&
        evt.target.classList.contains("edit") &&
        evt.key === "Enter"
      ) {
        const id = evt.target.closest("li").dataset.id;
        const textContents = evt.target.value;
        editTodoContents(id, textContents);
      } else if(
        evt.target.tagName === "INPUT" &&
        evt.target.classList.contains("edit") &&
        evt.key === "Escape") {
          evt.target.closest("li").classList.remove("editing");
        }
    }

    const focusoutHandler = (evt) => {
      if(evt.target.tagName === "INPUT" &&
      evt.target.classList.contains("edit")) {
        evt.target.closest("li").classList.remove("editing");
      }
    }

    this.$target.addEventListener("click", clickHandler);
    this.$target.addEventListener("keydown", keyDownHandler);
    this.$target.addEventListener("change", onChangeHandler);
    this.$target.addEventListener("focusout", focusoutHandler);
    this.$target.addEventListener("dblclick", onDblclickHandler);
  };
  this.initEventListeners();
  this.render();
}

export default TodoList;
