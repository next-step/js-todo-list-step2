import TodoItem from './todoItem.js';
import { ALL, VIEW, COMPLETE, USER_API, NONE, convertToPriority } from '../constant/constant.js';
import { validLength } from '../utils/utils.js';

class TodoList {
  constructor(
    $target,
    { filter, onDeleteItem, changeTodoState, changeTodoValue, changeTodoPriority, dataLoader, loader }
  ) {
    this.$target = $target;
    this.state = {
      user: {
        name: '',
        _id: '',
        todoList: []
      },
      filter
    };
    this.dataLoader = dataLoader;
    this.loader = loader;
    this.render();
    this.addEvent(onDeleteItem, changeTodoState, changeTodoValue, changeTodoPriority);
  }

  setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  addEvent = (onDeleteItem, changeTodoState, changeTodoValue, changeTodoPriority) => {
    this.$target.addEventListener('click', async (e) => {
      const { target } = e;
      const { className } = target;
      const closestLi = target.closest('li');
      const index = closestLi.dataset['index'];
      const id = this.state.user._id;
      const itemId = this.state.user.todoList[+index]._id;

      if (className === 'destroy') {
        await this.dataLoader.deleteData(USER_API + `/${id}/items/${itemId}`);
        onDeleteItem(+index);
      } else if (target.classList.contains('toggle')) {
        await this.dataLoader.putData(USER_API + `/${id}/items/${itemId}/toggle`);
        closestLi.classList.contains('completed')
          ? changeTodoState(+index, false)
          : changeTodoState(+index, true);
      } else if (target.classList.contains('chip')) {
        if (this.state.user.todoList[+index].priority !== NONE) {
          console.log("???");
        }
        const priority = convertToPriority[+target.value];
        const body = {
          priority
        };
        await this.dataLoader.putData(USER_API + `/${id}/items/${itemId}/priority`, body);
        changeTodoPriority(+index, priority);
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

    this.$target.addEventListener('keyup', async (e) => {
      const { target } = e;
      const { key } = e;
      const closestLi = target.closest('li');
      const index = closestLi.dataset['index'];

      const id = this.state.user._id;
      const itemId = this.state.user.todoList[+index]._id;

      if (key !== 'Enter' && key !== 'Escape') return;
      closestLi.classList.remove('editing');
      closestLi.classList.add('view');
      if (key === 'Enter') {
        const value = e.target.value.trim();
        if (value && validLength(value)) {
          const body = {
            contents: value
          };
          await this.dataLoader.putData(USER_API + `/${id}/items/${itemId}`, body);
          changeTodoValue(+index, value);
        }
      }
    });
  };

  render = () => {
    this.$target.innerHTML = '';
    this.state.user.todoList.map((item, index) => {
      // item.isCompleted 와 state.filter는 falsy한 값으로 비교
      if (this.state.filter !== ALL && item.isCompleted != this.state.filter) {
        return;
      }
      this.$target.insertAdjacentHTML(
        'beforeend',
        new TodoItem(
          item.isCompleted === true ? COMPLETE : VIEW,
          item.contents,
          index,
          item.priority
        ).template()
      );
    });
  };
}

export default TodoList;