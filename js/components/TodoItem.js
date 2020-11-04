// core
import DOM from '../core/createElement.js';

const TodoItem = ({ _id, contents, isCompleted, priority }) =>
  DOM.li({
    dataTodoId: _id,
    class: isCompleted && 'completed',
    innerHTML: `
      <li class="${isCompleted && 'completed'}" data-todo-id="${_id}">
        <div class="view">
          <input class="toggle" type="checkbox" ${isCompleted && 'checked'}/>
          <label class="label">
            <select class="${
              priority === 'FIRST'
                ? 'chip select primary'
                : priority === 'SECOND'
                ? 'chip select secondary'
                : 'chip select'
            }">
              <option value="0">순위</option>
              <option value="1" ${priority === 'FIRST' && 'selected'}>1순위</option>
              <option value="2" ${priority === 'SECOND' && 'selected'}>2순위</option>
            </select>${contents}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${contents}" />
      </li>
    `,
  });

export default TodoItem;
