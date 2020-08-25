import { VALUE, SELECTOR } from "../utils/constants.js";

export const todoContentsTemplate = (contents) => `
    <span class="${SELECTOR.CONTENTS}">${contents}</span>
  `;

export const todoLabelTemplate = (todo) => {
  switch (`${todo.priority}`) {
    case VALUE.NON_PRIORITY:
      return `
            <select class="chip ${SELECTOR.SELECT}">
              <option value="0" selected>순위</option>
              <option value="1">1순위</option>
              <option value="2">2순위</option>
            </select>
            ${todoContentsTemplate(todo.contents)}            
          `;
    case VALUE.PRIMARY_PRIORITY:
      return `
            <span class="chip primary">1순위</span>
            ${todoContentsTemplate(todo.contents)}
          `;
    case VALUE.SECONDARY_PRIORITY:
      return `
            <span class="chip secondary">2순위</span>
            ${todoContentsTemplate(todo.contents)}
          `;
  }
};

export const todoTemplate = (todo) => `
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
                ? todoContentsTemplate(todo.contents)
                : todoLabelTemplate(todo)
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

export const loadingTemplate = () => `
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
