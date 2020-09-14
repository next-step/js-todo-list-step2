const createTodoItem = (_id, contents, isCompleted, priority) => `
  <li class="${isCompleted ? 'completed' : ''}" data-key="${_id}">
    <div class="view">
      <input class="toggle" type="checkbox" ${isCompleted ? 'checked' : ''}/>
      <label class="label">
        ${createPrioritySelect(priority)}
        ${contents}
      </label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${contents}" />
  </li>;
`;

const createPrioritySelect = (priority) => {
  switch (priority) {
    case 'FIRST':
    case '1':
      return `
      <select class="chip select primary">
      <option value="1" selected >
      1순위
      </option>
      <option value="2">2순위</option>
      <option value="0">미지정</option>
      </select>
      `;

    case 'SECOND':
    case '2':
      return `
          <select class="chip select secondary">
            <option value="2" selected >
              2순위
            </option>
            <option value="1">1순위</option>
            <option value="2">미지정</option>
          </select>
        `;

    default:
      return `
        <select class="chip select ">
          <option value="0" selected >
            순위
          </option>
          <option value="1">1순위</option>
          <option value="2">2순위</option>
        </select>
      `;
  }
};

export default createTodoItem;
{
  /*

<li>
<div class="view">
  <input class="toggle" type="checkbox" />
  <label class="label">
    <span class="chip primary">1순위</span>
    해야할 아이템
  </label>
  <button class="destroy"></button>
</div>
<input class="edit" value="완료된 타이틀" />
</li>

<li>
<div class="view">
  <input class="toggle" type="checkbox" />
  <label class="label">
    <span class="chip secondary">2순위</span>
    해야할 아이템
  </label>
  <button class="destroy"></button>
</div>
<input class="edit" value="완료된 타이틀" />
</li>

<li class="completed">
<div class="view">
  <input class="toggle" type="checkbox" checked />
  <label class="label">완료된 아이템 </label>
  <button class="destroy"></button>
</div>
<input class="edit" value="완료된 타이틀" />
</li>

<li class="editing">
<div class="view">
  <input class="toggle" type="checkbox" checked />
  <label class="label">
    <span class="chip secondary">2순위</span>
    수정중인 아이템
  </label>
  <button class="destroy"></button>
</div>
<input class="edit" value="완료된 타이틀" />
</li> */
}
