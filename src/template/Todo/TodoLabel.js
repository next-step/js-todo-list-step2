import { getter } from '../../store/index.js';

const PRIORITY = {
  'NONE': '',
  'FIRST': 'primary',
  'SECOND': 'secondary'
};

const TodoLabel = (props) => {
  const dom = document.createElement('label');
  dom.classList.add('label');
  dom.dataset.component = 'todo-label';

  const render = () => {
    const { itemId } = props;
    const  { contents, priority } =  getter.userItem(itemId);
    dom.innerHTML = `
      <select class="chip select ${PRIORITY[priority]}"" data-component="todoPriority"> 
        <option value="NONE" ${priority === 'NONE' ? 'selected' : ''}>순위</option>
        <option value="FIRST" ${priority === 'FIRST' ? 'selected' : ''} >1순위</option>
        <option value="SECOND" ${priority === 'SECOND' ? 'selected' : ''}>2순위</option>
      </select>
      ${ contents }`
  };

  return { dom, render }
};

export default TodoLabel;