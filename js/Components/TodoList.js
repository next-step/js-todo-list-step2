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
    this.$target.innerHTML = `
    ${this.state.todoItems
      .map(({ _id, contents, isCompleted }) =>
        isCompleted
          ? `
            <li data-id=${_id}>
                <div class="view">
                    <input class="toggle" type="checkbox" checked/>
                    <label class="label"><span class="contents">${contents}</span></label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="완료된 타이틀" />
            </li>`
          : `
            <li data-id=${_id}>
                <div class="view">
                    <input class="toggle" type="checkbox" />
                    <label class="label"><span class="contents">${contents}</span></label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="완료된 타이틀" />
            </li>
        `
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
      if (
        evt.target.tagName === "INPUT" &&
        evt.target.classList.contains("toggle")
      ) {
        toggleTodo(evt.target.closest("li").dataset.id);
      }

      if (
        evt.target.tagName === "INPUT" &&
        evt.target.classList.contains("edit")
      ) {
        console.log(evt);
        const id = evt.target.closest("li").dataset.id;
        const textContents = evt.target.value;
        editTodoContents(id, textContents);
      }
    };

    const onDblclickHandler = (evt) => {
      console.log(evt);
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

    this.$target.addEventListener("click", clickHandler);
    this.$target.addEventListener("change", onChangeHandler);
    this.$target.addEventListener("dblclick", onDblclickHandler);
  };
  this.initEventListeners();
  this.render();
}

export default TodoList;
