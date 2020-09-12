import { Observer } from "../observer/Observer.js";
import templates from "../data/templates.js";

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
            if (target) {
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
        let $li = target.closest("li");
        return { $li, itemId: $li.dataset["todoIdx"] }
    }

    #destroy(target) {
        let { itemId } = this.#getItem(target);
        this._service.deleteItem(itemId);
    }

    #toggle(target) {
        let { itemId } = this.#getItem(target);
        this._service.toggleItem(itemId)
    }

    #modifyStart(target) {
        let { $li } = this.#getItem(target);
        $li.classList.add("editing");
    }

    #undo(target) {
        let { $li } = this.#getItem(target);
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
        let { todoList } = this._service.getSelectedUser();
        super.setState({ todoList });
    }


    render() {
        const { todoList } = this._state;
        if (todoList)
            this._target.innerHTML = todoList.map(item => templates.todoItem(item))
    }
}

