/**
 * @param {string} title
 * @param {number} id
 * @param {boolean} complete
 * @returns {string}
 */

export const todoTemplate = (id, contents, isCompleted) => `
 <li data-id=${id} class=${isCompleted ? 'completed' : ''}>
     <div class="view">
         <input class="toggle" type="checkbox" ${isCompleted ? 'checked' : ''}/>
         <label class="label">${contents}</label>
         <button class="destroy"></button>
     </div>
     <input class="edit"/>
 </li>`;

/**
 * @param {object[]} datas
 * @returns {string}
 */

export const todoListTemplate = (datas) => {
  let result = '';
  datas &&
    datas.map((todo) => {
      result += todoTemplate(todo._id, todo.contents, todo.isCompleted);
    });
  return result;
};

/**
 * @param {number} counter
 * @returns {string}
 */
export const todoCounterTemplate = (counter) =>
  `총 <strong>${counter}</strong> 개</span>`;

export const userTemplate = (userName) =>
  `<button class="ripple">${userName}</button>`;

export const userTitleTemplate = (userName) =>
  `<span><strong>${userName}</strong>'s Todo List</span>`;

export const loaderTemplate = `
  <label class="label">
    <div class="animated-background">
      <div class="skel-mask-container">
        <div class="skel-mask"></div>
      </div>
    </div>
  </label>`;
