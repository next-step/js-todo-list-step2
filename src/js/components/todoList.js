import TodoItem from './todoItem.js';
import { ALL, VIEW, COMPLETE, USER_API } from '../constant/constant.js';
import { validLength } from '../utils/utils.js';

class TodoList {
  constructor(
    $target,
    { filter, onDeleteItem, changeTodoState, changeTodoValue, dataController }
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
    this.dataController = dataController;
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

      const id = this.state.user._id;
      const itemId = this.state.user.todoList[+index]._id;

      if (className === 'destroy') {
        this.dataController.deleteData(USER_API + `/${id}/items/${itemId}`);
        onDeleteItem(+index);
      } else if (target.classList.contains('toggle')) {
        this.dataController.putData(USER_API + `/${id}/items/${itemId}/toggle`);
        closestLi.classList.contains('completed')
          ? changeTodoState(+index, false)
          : changeTodoState(+index, true);
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
          this.dataController.putData(USER_API + `/${id}/items/${itemId}`, body);
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