import { Observer } from "../observer/Observer.js";
import { Priorities } from "../data/constant.js";

export const TodoList = class extends Observer {


    setEvent() {
        this._target.addEventListener('click', ({ target }) => {
            if (target && target.classList.contains("toggle")) {
                this.#toggle(target);
            }
        });
        this._target.addEventListener('click', ({ target }) => {
            if (target && target.classList.contains("destroy")) {
                this.#destroy(target);
            }
        });
        this._target.addEventListener('change', ({ target }) => {
            if (target && target.tagName==="SELECT") {
                this.#changePriority(target);
            }
        });
        this._target.addEventListener('dblclick', ({ target }) => {
            if (target && target.classList.contains("label")) {
                this.#modifyStart(target);
            }
        });
        this._target.addEventListener('keyup', ({ target, key }) => {
            if (target && target.classList.contains("edit") && key === "Enter") {
                this.#modifyComplete(target);
            }
        });
        this._target.addEventListener('keyup', ({ target, key }) => {
            if (target && target.classList.contains("edit") && key === "Escape") {
                this.#undo(target);
            }
        });
    }

    #getItem(target) {
        const $li = target.closest("li");
        return { $li, itemId: $li.dataset["todoIdx"] }
    }

    #destroy(target) {
        const { itemId } = this.#getItem(target);
        this._service.deleteItem(itemId);
    }

    #toggle(target) {
        const { itemId } = this.#getItem(target);
        this._service.toggleItem(itemId)
    }

    #modifyStart(target) {
        const { $li } = this.#getItem(target);
        $li.classList.add("editing");
    }

    #undo(target) {
        const { $li } = this.#getItem(target);
        target.value = $li.querySelector(".label-content").textContent;
        $li.classList.remove("editing");
    }

    #modifyComplete(target) {
        const { $li, itemId } = this.#getItem(target);
        const $label = $li.querySelector(".label-content");
        $li.classList.remove("editing");
        if (target.value !== $label.textContent) {
            this._service.updateItem(itemId, target.value);
        }
    }


    #changePriority(target) {
        const { itemId } = this.#getItem(target);
        this._service.updateItemPriority(itemId, target.value);
    }

    setState() {
        const todoList = this._service.currentFilteredTodoList();
        super.setState({ todoList });
    }


    /*render() {
        const { todoList } = this._state;
        if (todoList)
            this._target.innerHTML = todoList.map(item => templates.todoItem(item))
    }*/
    template() {
        const { todoList } = this._state;
        return todoList.map(({ _id, contents, isCompleted, priority })=> {
            return `<li data-todo-idx="${_id}" class="${isCompleted ? "completed" : ""}">
                      <div class="view">
                        <input class="toggle" type="checkbox" ${isCompleted ? "checked" : ""} />
                        <label class="label">
                          <select class="chip ${priority === Priorities.FIRST ? "primary" : priority === Priorities.SECOND ? "secondary" : "select"}">
                            <option value="0" ${priority === Priorities.NONE ? "selected" : ""}>순위</option>
                            <option value="1" ${priority === Priorities.FIRST ? "selected" : ""}>1순위</option>
                            <option value="2" ${priority === Priorities.SECOND ? "selected" : ""}>2순위</option>
                          </select>
                          <span class="label-content">${contents}</span>
                        </label>
                        <button class="destroy"></button>
                      </div>
                      <input class="edit" value="${contents}" />
                    </li>`;
        })
    }
}

