import TodoLabel from './TodoLabel.js';

const TodoItem = (props) => {
  const components = {
    todoLabel: undefined
  };

  const { todo } = props;
  const dom = document.createElement('li');
  dom.dataset.todoIdx = todo._id;
  dom.classList.add('editing');

  const render = () => {
    const { contents, isCompleted, mode } = todo;
    const viewCondition = () => (mode === undefined || mode === 'view');
    const display = (condition) => condition ? 'block' : "none";

    components.todoLabel = TodoLabel({ contents });

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

  return { dom, render };
};

export default TodoItem;