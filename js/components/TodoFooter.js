import { Observer } from "../observer/Observer.js";

export const TodoFooter = class extends Observer {

    setEvent() {
        this._target.addEventListener('click', ({ target }) => {
            if (target && target.tagName === "A") {
                this._service.switchTap(target.dataset['tab']);
            }
        });

        this._target.addEventListener('click', ({ target }) => {
            if (target && target.classList.contains("clear-completed")) {
                this._service.deleteItems();
            }
        });
    }

    setState() {
        super.setState({count: this._service.currentFilteredTodoList().length, type: this._service.currentFilterTab()})
    }

    template() {
        const {count, type} = this._state;
        return `<span class="todo-count">총 <strong>${count}</strong> 개</span>
                  <ul class="filters">
                    <li>
                      <a href="/#" data-tab="all" class="all ${type === "all" ? "selected" : ""}" >전체보기</a>
                    </li>
                    <li>
                      <a href="#active" data-tab="active" class="active ${type === "active" ? "selected" : ""}">해야할 일</a>
                    </li>
                    <li>
                      <a href="#completed" data-tab="completed" class="completed ${type === "completed" ? "selected" : ""}">완료한 일</a>
                    </li>
                  </ul>
                  <button class="clear-completed">모두 삭제</button>`
    }
}
