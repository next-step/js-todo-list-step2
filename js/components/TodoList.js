import { todoDOM } from "../utils/templates.js";
import { checkTarget } from "../utils/validator.js";

class TodoList {
    constructor($target, todos) {
        checkTarget($target)

        this.$target = $target
        this.todos = todos

        this.render();
    }

    createTodoListHTML = (todos) => {
        return todos.reduce((html, todo) => {
          html += todoDOM(todo);
          return html;
        }, '');
      };

    render = () => {
        this.$target.innerHTML = this.createTodoListDOM(this.todos);
    }
}

export default TodoList;