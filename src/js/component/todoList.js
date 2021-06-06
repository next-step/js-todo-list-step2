
export const loadingBar = () =>{
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
}

export const todoItem = (item) =>{
  return `
  <li>
    <div class="view">
      <input class="toggle" type="checkbox" />
      <label class="label">
        <select class="chip select">
          <option value="0" selected>순위</option>
          <option value="1">1순위</option>
          <option value="2">2순위</option>
        </select>
        해야할 아이템
      </label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="완료된 타이틀" />
  </li>
  `;
}

