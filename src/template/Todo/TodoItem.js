import TodoLabel from './TodoLabel.js';

const TodoItem = (props) => {
  const { todo } = props;
  const dom = document.createElement('li');
  dom.dataset.todoIdx = todo._id;

  const render = () => {
    const { contents, isCompleted } = todo;
    dom.innerHTML = `
      <div class="view">
      <input class="toggle" type="checkbox" data-component="toggleComplete" ${ isCompleted && "checked"}/>
      ${ TodoLabel({ contents }) }
      <button class="destroy" data-component="deleteItem"></button>
    </div>
    <input class="edit" value="${ contents }" />
  `;
  };

  return { dom, render };
};

export default TodoItem;