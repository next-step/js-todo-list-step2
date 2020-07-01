import { CLASS_NAME } from './constants.js'

export const loadingComponentTemplate = ` 
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
                </li>`

export const todoCountComponentTemplate = (totalCount, completedCount) => {
  return `
    <span id="todo-count" class="todo-count">총 <span class="count">${totalCount}</span> 개 중</span>
    <span id="completed-count" class="todo-count"><span class="count">${completedCount}</span> 개 완료</span>`
}

const getPriorityClassName = (priority) => {
  return priority === '1' ? CLASS_NAME.PRIORITY_FIRST : CLASS_NAME.PRIORITY_SECOND
}

const getPriorityHTML = (priority) => {
  return priority ?
    `<span class="chip ${getPriorityClassName(priority)}">${priority}순위</span>`
    :
    `<select class="chip select">
         <option value="0" selected>순위</option>
         <option value="1">1순위</option>
         <option value="2">2순위</option>
      </select>`
}

export const todoItemHTMLTemplate = ({ _id, contents, priority, isCompleted }, index) => {
  return `
      <li data-id=${_id} data-index=${index} class=${isCompleted ? 'completed' : ''}>
          <div class="view">
            <input class="toggle" type="checkbox" ${isCompleted ? 'checked' : ''}/>
            <label class="label">
                ${getPriorityHTML(priority)}
                ${contents}
            </label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value=${contents} />
      </li>`
}
