import TodoCount from './TodoCount.js';
import TodoFilter from './TodoFilter.js';
import { deleteUserItemsAllService } from '../../endpoint/service.js';
import { getter, setter } from '../../store/index.js';

const TodoCountContainer = () => {
  const dom = document.createElement('div');
  dom.classList.add('count-container');

  const components = {
    TodoCount: TodoCount(),
    TodoFilter: TodoFilter()
  };

  const deleteUserItems = async ({ target }) => {
    const userId = getter.userId();
    try {;
      const result = await deleteUserItemsAllService({ userId });
      alert(result.message)
    } catch (err) {
      if (err.message === 'user not found') {
        alert(err.message);
        await setter.userList();
        await setter.user();
      }
    }
  };
  const clearCompleted = document.createElement('button');
  clearCompleted.classList.add('clear-completed');
  clearCompleted.innerText = '모두 삭제';
  clearCompleted.addEventListener('click', deleteUserItems);

  dom.appendChild(components.TodoCount.dom);
  dom.appendChild(components.TodoFilter.dom);
  dom.appendChild(clearCompleted);

  components.TodoCount.render();
  components.TodoFilter.render();

  return { dom };
};

export default TodoCountContainer;