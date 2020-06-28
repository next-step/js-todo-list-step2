export const todoItemTemplate = item => (
  `<li id="${item.id}" class="${item.completed ? 'completed' : ''} ${item.editing ? 'editing' : ''}">
    <div class="view">
      <input class="toggle" type="checkbox" ${item.completed ? 'checked' : ''}/>
      <label class="label">
        ${item.chipSelected ?
    item.priority ? `<span class="chip primary">1순위</span>` : `<span class="chip secondary">2순위</span>` :
    `<select class="chip select">
            <option value="0" selected>순위</option>
            <option value="1">1순위</option>
            <option value="2">2순위</option>
          </select>`
  }
        ${item.contents}
      </label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${item.contents}" />
  </li>`
);

export const isValidContents = contents => {
  if (typeof contents !== 'string') return false;
    if (contents.trim() === '') return false;
    return true;
}