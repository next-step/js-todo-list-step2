export const todoItem = (data) => {
  return `
        <li id="${data._id}" class="${data.isCompleted ? "completed" : ""}">
            <div class="view">
            <input class="toggle" type="checkbox" ${
              data.isCompleted ? "checked" : ""
            }/>
            <label class="label">
            ${
              data.priority === "FIRST"
                ? `
              <span class="chip primary">1순위</span>
              `
                : data.priority === "SECOND"
                ? `
              <span class="chip secondary">2순위</span>
              `
                : `
              <select class="chip select">
                <option value="0" selected>순위</option>
                <option value="1">1순위</option>
                <option value="2">2순위</option>
              </select>
              `
            }
              ${data.contents}
            </label>
            <button class="destroy"></button>
            </div>
            <input class="edit" value="${data.contents}" />
        </li>
    `;
};

export const todoPriority = (data) => {};

export const loading = () => {
  return `
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
      </li>
    `;
};
