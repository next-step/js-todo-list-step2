import { validator } from "../utils/validator.js";
import { todoListTemplate } from "../utils/templates.js";
import { CLASS_NAME_MAP, KEY_MAP } from "../utils/constants.js";

const validateTodoList = (context, params) => {
  validator.isNewInstance(context, TodoList);
  validator.isObject(params);

  const { $target, data, onToggle, onRemove, onModify } = params;

  validator.isElement($target);
  validator.isArray(data);
  validator.isFunction(onToggle);
  validator.isFunction(onRemove);
  validator.isFunction(onModify);

  data.forEach((todo) => {
    validator.isString(todo.contents);
    validator.isNotZeroLengthString(todo.contents);
    validator.isBoolean(todo.isCompleted);
  });
};

export default function TodoList(params) {
  validateTodoList(this, params);

  const { $target } = params;
  this.data = params.data || [];
  this.onToggle = params.onToggle;
  this.onRemove = params.onRemove;
  this.onModify = params.onModify;
  this.onSelect = params.onSelect;

  this.onFocus = ($edit) => $edit.classList.toggle(CLASS_NAME_MAP.FOCUS);
  this.onKeyDown = (e) => {
    const $edit = e.target.closest("li");
    const { id } = $edit.dataset;

    switch (e.key) {
      case KEY_MAP.ESC:
        {
          const index = this.data.findIndex((todo) => todo._id === id);
          e.target.value = this.data[index].contents;
          this.onFocus($edit);
        }
        break;
      case KEY_MAP.ENTER:
        {
          const content = e.target.value;
          this.onModify(id, content);
        }
        break;
    }
  };

  this.controlPriority = (id, priority) => {
    if (priority !== 0) {
      this.onSelect(id, priority);
    }
  };

  this.onClick = (e) => {
    const { id } = e.target.closest("li").dataset;

    if (e.target.classList.contains(CLASS_NAME_MAP.TOGGLE)) {
      this.onToggle(id);
    } else if (e.target.classList.contains(CLASS_NAME_MAP.REMOVE)) {
      this.onRemove(id);
    } else if (e.target.classList.contains(CLASS_NAME_MAP.SELECT)) {
      this.controlPriority(id, Number(e.target.value));
    }
  };

  $target.addEventListener("click", this.onClick);

  $target.addEventListener("dblclick", ({ target }) => {
    if (target.classList.contains(CLASS_NAME_MAP.LABEL)) {
      const $edit = target.closest("li");
      this.onFocus($edit);
    }
  });

  $target.addEventListener("keydown", (e) => {
    if (!e.target.classList.contains(CLASS_NAME_MAP.ON_EDIT)) {
      return;
    }

    this.onKeyDown(e);
  });

  this.setState = (nextData) => {
    this.data = nextData || [];
    this.render();
  };

  this.render = () => {
    $target.innerHTML = todoListTemplate(this.data);
  };

  this.render();
}
