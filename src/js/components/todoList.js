import TodoItem from './todoItem.js';
import { ALL, VIEW, COMPLETE } from '../constant/constant.js';

class TodoList {
  constructor(
    $target,
    { todoList, filter, onDeleteItem, changeTodoState, changeTodoValue }
  ) {
    this.$target = $target;
    this.state = {
      todoList,
      filter
    }
    this.render();
    this.addEvent(onDeleteItem, changeTodoState, changeTodoValue);
  }

  setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  addEvent = (onDeleteItem, changeTodoState, changeTodoValue) => {
    this.$target.addEventListener('click', (e) => {
      const { target } = e;
      const { className } = target;
      const closestLi = target.closest('li');
      const index = closestLi.dataset['index'];
      if (className === 'destroy') {
        onDeleteItem(index);
      } else if (target.classList.contains('toggle')) {
        closestLi.classList.contains('completed')
          ? changeTodoState(+index, VIEW)
          : changeTodoState(+index, COMPLETE);
      }
    });

    this.$target.addEventListener('dblclick', (e) => {
      const { target } = e;
      const { className } = target;
      const closestLi = target.closest('li');
      const inputElem = closestLi.querySelector('.edit');
      if (className === 'label') {
        closestLi.classList.add('editing');
        inputElem.focus();
        inputElem.value = '';
      }
    });

    this.$target.addEventListener('keyup', (e) => {
      const { target } = e;
      const { key } = e;
      const closestLi = target.closest('li');
      const index = closestLi.dataset['index'];
      if (key !== 'Enter' && key !== 'Escape') return;
      closestLi.classList.remove('editing');
      closestLi.classList.add('view');
      if (key === 'Enter') {
        const value = e.target.value.trim();
        if (value) {
          changeTodoValue(+index, value);
        }
      }
    });
  };

  render = () => {
    this.$target.innerHTML = '';
    this.state.todoList.map((item, index) => {
      // item.isCompleted 와 state.filter는 falsy한 값으로 비교
      if (this.state.filter !== ALL && item.isCompleted != this.state.filter) {
        return;
      }
      this.$target.insertAdjacentHTML(
        'beforeend',
        new TodoItem(
          item.isCompleted === true ? COMPLETE : VIEW,
          item.content,
          item.id,
          item.priority
        ).template()
      );
    });
  };
}

export default TodoList;