const TodoLabel = ({ contents }) => {
  return `
  <label class="label">
    <select class="chip select"> 
      <option value="0" selected>순위</option>
      <option value="1">1순위</option>
      <option value="2">2순위</option>
    </select>
    ${ contents }
  </label>
  `;
};

// chip primary secondary

export default TodoLabel;