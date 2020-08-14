import { VALUE, SELECTOR, KEY } from "../utils/constants.js";

export default function TodoList(
  $todoList,
  { deleteTodo, toggleTodo, editTodo, changePriorityTodo }
) {
  this.todoContentsTemplate = (contents) => `
    <span class="${SELECTOR.CONTENTS}">${contents}</span>
  `;

  this.todoLabelTemplate = (todo) => {
    switch (`${todo.priority}`) {
      case VALUE.NON_PRIORITY:
        return `
            <select class="chip ${SELECTOR.SELECT}">
              <option value="0" selected>순위</option>
              <option value="1">1순위</option>
              <option value="2">2순위</option>
            </select>
            ${this.todoContentsTemplate(todo.contents)}            
          `;
      case VALUE.PRIMARY_PRIORITY:
        return `
            <span class="chip primary">1순위</span>
            ${this.todoContentsTemplate(todo.contents)}
          `;
      case VALUE.SECONDARY_PRIORITY:
        return `
            <span class="chip secondary">2순위</span>
            ${this.todoContentsTemplate(todo.contents)}
          `;
    }
  };

  this.todoTemplate = (todo) => `
    <li id="${todo._id}" class=${
    todo.isCompleted ? SELECTOR.COMPLETED : SELECTOR.VIEW
  }>
        <div class="${SELECTOR.VIEW}">
            <input class="${SELECTOR.TOGGLE}" type="checkbox" ${
    todo.isCompleted ? "checked" : ""
  }/>
            <label class="${SELECTOR.LABEL}">
            ${
              todo.isCompleted
                ? this.todoContentsTemplate(todo.contents)
                : this.todoLabelTemplate(todo)
            }
            </label>
            <button class="${SELECTOR.DESTROY}"></button>
        </div>
        <select class="chip ${SELECTOR.SELECT} edit-select">
              <option value="0" selected>순위</option>
              <option value="1">1순위</option>
              <option value="2">2순위</option>
            </select>
        <input class="${SELECTOR.EDIT}" value="${todo.contents}" />
    </li>    
  `;

  this.loadingTemplate = () => `
    <li>
        <div class="${SELECTOR.VIEW}">
            <label class="${SELECTOR.LABEL}">
                <div class="animated-background">
                    <div class="skel-mask-container">
                        <div class="skel-mask"></div>
                    </div>
                </div>
            </label>
        </div>
    </li>
  `;

  this.render = (todos, loading) => {
    const template = todos.length ? todos.map(this.todoTemplate) : [];
    $todoList.innerHTML = loading ? this.loadingTemplate() : template.join("");
  };

  const onClickTodo = (event) => {
    const $target = event.target;
    const $li = $target.closest("li");

    if ($target.classList.contains(SELECTOR.TOGGLE)) {
      toggleTodo($li.id);
      return;
    }

    if ($target.classList.contains(SELECTOR.DESTROY)) {
      deleteTodo($li.id);
      return;
    }
  };

  const onDblclickTodo = (event) => {
    const $target = event.target;
    const $li = $target.closest("li");

    if ($li.classList.contains(SELECTOR.VIEW)) {
      $li.classList.add(SELECTOR.EDITING);
    }
  };

  const onKeydownTodo = (event) => {
    const $target = event.target;
    const $li = $target.closest("li");

    const onEditKeydown = () => {
      if ($target.value && event.key === KEY.ENTER) {
        editTodo($li.id, $target.value);
        return;
      }

      if (event.key === KEY.ESCAPE) {
        $li.classList.remove(SELECTOR.EDITING);
        $target.value = $li.querySelector(`.${SELECTOR.CONTENTS}`).textContent;
      }
    };

    if ($target.classList.contains(SELECTOR.EDIT)) {
      onEditKeydown();
    }
  };

  const onSelectPriorityChange = (event) => {
    const $target = event.target;
    const $li = $target.closest("li");

    if ($target.classList.contains(SELECTOR.SELECT)) {
      changePriorityTodo($li.id, $target.value);
    }
  };

  this.bindEvent = () => {
    $todoList.addEventListener("click", onClickTodo);
    $todoList.addEventListener("dblclick", onDblclickTodo);
    $todoList.addEventListener("keydown", onKeydownTodo);
    $todoList.addEventListener("change", onSelectPriorityChange);
  };

  this.init = () => {
    this.bindEvent();
  };

  this.init();
}
