export const todoItem = (data) => {
  return `
        <li id="${data.id}" class="${data.completed ? 'completed' : ''}">
            <div class="view">
            <input class="toggle" type="checkbox" ${
              data.completed ? 'checked' : ''
            }/>
            <label class="label">${data.title}</label>
            <button class="destroy"></button>
            </div>
            <input class="edit" value="${data.title}" />
        </li>
    `;
};
