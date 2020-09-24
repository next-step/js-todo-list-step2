// TODO refactor
import { createDOM } from '../../utils.js';

const PRIORITY = [
  { en: 'NONE', ko: '순위', style: '' },
  { en: 'FIRST', ko: '1순위', style: 'primary' },
  { en: 'SECOND', ko: '2순위', style: 'secondary' },
];

const style = {
  NONE: '',
  FIRST: 'primary',
  SECOND: 'secondary'
};

const TodoLabel = ({ todo }) => {
  const dom = createDOM(
    'label',
    {
      className: 'label',
    },
    {
      component: 'todo-label',
    },
  );

  const selected = (priority, option) => (
    priority === option ? 'selected' : ''
  );

  const render = () => {
    const { priority, contents } = todo;
    dom.innerHTML = `
      <select class="chip select ${style[priority]}"" data-component="todoPriority"> 
      ${
        PRIORITY.map(({ en, ko }) => (
          `<option value="${en}" ${selected(priority, en)}>${ko}</option>`
        ))
      }
      </select>
      ${contents}`;
  };

  return { dom, render };
};

export default TodoLabel;