export const listComponent = {
  isLoading: `
    <li>
    <div class="view">
      <label class="label">
        <div class="animated-background">
          <div class="skel-mask-container">
            <div class="skel-mask"></div>
          </div>
        </div>
      </label>
    </div>
    </li>`,

  listMessage: (message) => {
    return `
    <li>
        <div class="view">
            <label class="label">
                ${message}
            </label>
        </div>
    </li>
        `;
  },

  listToDo: (todo) => {
    return `
    <li id='${todo._id}' class='${todo.isCompleted == true ? 'completed' : ''}'>
        <div class="view">
            <input class="toggle" type="checkbox" ${
              todo.isCompleted == true ? 'checked' : ''
            }/>
            <label class="label">
            ${
              todo.priority == 'NONE'
                ? `<select class="chip select">
                <option value="0" selected>순위</option>
                <option value="1">1순위</option>
                <option value="2">2순위</option>
            </select>`
                : ` <span class="chip ${
                    todo.priority == 'FIRST' ? 'primary' : 'secondary'
                  }">
                ${todo.priority == 'FIRST' ? '1' : '2'}순위
              </span>`
            }
            ${todo.contents}
            </label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="${todo.contents}" />
    </li>
    
    `;
  },
};
