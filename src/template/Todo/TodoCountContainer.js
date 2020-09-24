import TodoCount from './TodoCount.js';
import TodoFilter from './TodoFilter.js';
import { removeUserTodoItemsAll } from '../../endpoint/service.js';
import { getter, setter, initStore } from '../../store/index.js';
import { ERROR } from '../../constants/messageAPI.js';

const TodoCountContainer = (props) => {
  const { getFilter, setFilter } = props;
  const dom = document.createElement('div');
  dom.classList.add('count-container');

  const components = {
    TodoCount: TodoCount({ getFilter }),
    TodoFilter: TodoFilter({ getFilter, setFilter }),
  };

  const deleteUserItems = async () => {
    const userId = getter.userId();
    try {
      const result = await removeUserTodoItemsAll({ userId });
      await setter.userItems(userId);
      alert(result.message);
    }
    catch (err) {
      if (err.message === ERROR.NO_USER3) {
        await initStore();
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