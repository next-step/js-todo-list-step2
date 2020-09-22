import TodoLabel from './TodoLabel.js';
import * as CONST from '../../constants/index.js';

const TodoItem = (props) => {
  const { getFilter, todo } = props;
  const { _id } = todo;

  const components = {
    todoLabel: undefined
  };

  const dom = document.createElement('li');
  dom.dataset.todoIdx = _id;
  dom.classList.add('editing');

  const render = () => {
    const { getFilter, todo } = props;
    const { contents, isCompleted, mode } = todo;
    const viewCondition = () => (mode === undefined || mode === 'view');
    const modeDisplay = (condition) => condition ? 'block' : "none";
    const filter = getFilter();
    // filter 가 all     : isCompleted 에 관계없이 display blcok
    // filter 가 active  : isCompleted 가 false 일 때, diplay block
    // filter 가 completed : isCompleted 가 true 일 때, disply block
    const filterDisplay = () => {
      if (filter === CONST.ALL) return 'block';
      if (filter === CONST.ACTIVE && isCompleted === false) return 'block';
      if (filter === CONST.ACTIVE && isCompleted === true) return 'none';
      if (filter === CONST.COMPLETED && isCompleted === false) return 'none';
      if (filter === CONST.COMPLETED && isCompleted === true) return 'block';
    };
    dom.style.display = filterDisplay();

    components.todoLabel = TodoLabel({ todo });

    dom.innerHTML = `
    <div class="view" style="display: ${modeDisplay(viewCondition())}">
      <input class="toggle" type="checkbox" data-component="toggleComplete" ${ isCompleted && "checked"}/>
      <button class="destroy" data-component="deleteItem"></button>
    </div>
    <input class="edit" data-component="editMode" style="display: ${modeDisplay(!viewCondition())}" value="${ contents }" required/>
  `;
    dom.querySelector('.view').insertBefore(components.todoLabel.dom, dom.querySelector('.destroy'));
    components.todoLabel.render();
  };
  getFilter(render)
  return { dom, render, components };
};

export default TodoItem;