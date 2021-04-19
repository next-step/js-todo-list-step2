export const todoItem = (data) => {
  return `
        <li id="${data._id}" class="${data.isCompleted ? 'completed' : ''}">
            <div class="view">
            <input class="toggle" type="checkbox" ${
              data.isCompleted ? 'checked' : ''
            }/>
            <label class="label">${data.contents}</label>
            <button class="destroy"></button>
            </div>
            <input class="edit" value="${data.contents}" />
        </li>
    `;
};
