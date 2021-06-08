const todoItemTemplate = (item) => {
  if (item.contents === "") return null;
  return `  
  <li class=${item.completed ? "completed" : null } id="${item._id}"}>
    <div class="view">
      <input class="toggle" type="checkbox" ${item.completed ? "checked": null}/>
      <label class="label">
        ${item.contents}
      </label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${item.contents}" />
  </li>
  `;
}; 

export default todoItemTemplate;