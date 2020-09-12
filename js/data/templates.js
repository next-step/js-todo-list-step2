export const templates = {

    todoItem({ _id, contents, isCompleted, priority }) {
        return `<li data-todo-idx="${_id}" class="${isCompleted ? "completed" : ""}">
          <div class="view">
            <input class="toggle" type="checkbox" ${isCompleted ? "checked" : ""} />
            <label class="label">
              <select class="chip ${priority === "FIRST" ? "primary" : priority === "SECOND" ? "secondary" : "select"}">
                <option value="0" ${priority === "NONE" ? "selected" : ""}>순위</option>
                <option value="1" ${priority === "FIRST" ? "selected" : ""}>1순위</option>
                <option value="2" ${priority === "SECOND" ? "selected" : ""}>2순위</option>
              </select>
              <span class="label-content">${contents}</span>
            </label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value="${contents}" />
        </li>`
    },

    userBtn({ _id, name }, active) {
        return `<button class="ripple ${active ? 'active' : ''}" data-idx="${_id}">${name}</button>`;
    },

    userCreateBtn() {
        return `<button class="ripple user-create-button">+ 유저 생성</button>`;
    },

    footer({ count, type }) {
        return `<span class="todo-count">총 <strong>${count}</strong> 개</span>
                  <ul class="filters">
                    <li>
                      <a href="/#" class="all ${type === "all" ? "selected" : ""}" >전체보기</a>
                    </li>
                    <li>
                      <a href="#active" class="active ${type === "active" ? "selected" : ""}">해야할 일</a>
                    </li>
                    <li>
                      <a href="#completed" class="completed ${type === "completed" ? "selected" : ""}">완료한 일</a>
                    </li>
                  </ul>
                  <button class="clear-completed">모두 삭제</button>`
    },

    loadingBar() {
        return `<li>
                  <div class="view">
                    <label class="label">
                      <div class="animated-background">
                        <div class="skel-mask-container">
                          <div class="skel-mask"></div>
                        </div>
                      </div>
                    </label>
                  </div>
                </li>`
    },

    userTitle(name) {
        return `<span><strong>${name}</strong>'s Todo List</span>`;
    }

}

export default templates;
