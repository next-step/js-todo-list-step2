// TODO refactor
import TodoLabel from './TodoLabel.js';
import * as CONST from '../../constants/index.js';
import { createDOM } from '../../utils.js';

const TodoItem = ({ getFilter, todo, todo: { _id } }) => {

  const components = {
    todoLabel: undefined,
  };

  const dom = createDOM(
    'li',
    {
      className: 'editing',
    },
    {
      todoIdx: _id,
    },
  );

  const editOrView = (mode) => (
    mode === undefined || mode === 'view'
  );

  const displayStyle = (condition) => (
    `display: ${condition ? 'block' : 'none'}`
  );
  const filterDisplay = (isCompleted) => {
    const filter = getFilter();
    return ((filter === CONST.ALL) ||
      (filter === CONST.ACTIVE && !isCompleted) ||
      (filter === CONST.COMPLETED && isCompleted)
    ) ? 'block' : 'none';
  };

  const render = () => {
    const { contents, isCompleted, mode } = todo;
    const isView = editOrView(mode);

    dom.style.display = filterDisplay(isCompleted);

    components.todoLabel = TodoLabel({ todo });

    dom.innerHTML = `
    <div class="view" style="${displayStyle(isView)}">
      <input class="toggle" 
              type="checkbox" 
              data-component="toggleComplete" 
              ${isCompleted && 'checked'}/>
      <button class="destroy" data-component="deleteItem"></button>
    </div>
    <input class="edit" 
            data-component="editMode" 
            style="${displayStyle(!isView)}" 
            value="${contents}" 
            required/>
  `;
  dom.querySelector('.view')
      .insertBefore(
        components.todoLabel.dom,
        dom.querySelector('.destroy'),
      );
    components.todoLabel.render();
  };
  getFilter(render);
  render();
  return { dom, render, components };
};

export default TodoItem;