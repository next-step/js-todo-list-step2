import TodoLabel from './TodoLabel.js';
import { getter } from '../../store/index.js';

const TodoItem = (props) => {
  const components = {
    todoLabel: undefined
  };

  const { itemId } = props;
  const dom = document.createElement('li');
  dom.dataset.todoIdx = itemId;
  dom.classList.add('editing');

  const render = () => {
    const { contents, isCompleted, mode } =  getter.userItem(itemId);
    const viewCondition = () => (mode === undefined || mode === 'view');
    const display = (condition) => condition ? 'block' : "none";

    components.todoLabel = TodoLabel(props);

    dom.innerHTML = `
    <div class="view" style="display: ${display(viewCondition())}">
      <input class="toggle" type="checkbox" data-component="toggleComplete" ${ isCompleted && "checked"}/>
      <button class="destroy" data-component="deleteItem"></button>
    </div>
    <input class="edit" data-component="editMode" style="display: ${display(!viewCondition())}" value="${ contents }" required/>
  `;
    dom.querySelector('.view').insertBefore(components.todoLabel.dom, dom.querySelector('.destroy'));
    components.todoLabel.render();
  };

  return { dom, render, components };
};

export default TodoItem;