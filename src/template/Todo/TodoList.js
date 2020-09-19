import TodoLoading from './TodoLoading.js';
import TodoItem from './TodoItem.js';
import { getter } from '../../store/index.js';
import { observer } from '../../store/index.js';

const TodoList = () => {
  const components = {
    TodoLoading: TodoLoading(),
  };

  const dom = document.createElement('section');
  dom.classList.add('main');

  const ul = document.createElement('ul');
  ul.classList.add('todo-list');
  ul.appendChild(components.TodoLoading.dom);
  dom.appendChild(ul);

  const todos = document.createElement('div');
  ul.appendChild(todos);

  components.TodoLoading.render();

  const render = () => {
    const { user } = getter;
    todos.innerHTML = `
      ${ user()?.todoList?.map(todo => `<li data-todoIdx="${ todo._id }">  ${ TodoItem({ todo }) } </li>`).join('') }
    `;
  };

  observer.addObserver('user', render);
  observer.addObserver('userItems', render);

  return { dom, render };
};

export default TodoList;