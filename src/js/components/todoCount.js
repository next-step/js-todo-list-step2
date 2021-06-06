import { ALL, VIEW, COMPLETE, currentFilter, USER_API } from '../constant/constant.js';

class TodoCount {
  constructor($target, { filter, changeFilter, clearList, dataController }) {
    this.$target = $target;
    this.state = {
      user: {
        _id: '',
        name: '',
        todoList: []
      },
      filter,
    };
    this.dataController = dataController;
    this.render();
    this.addEvent(changeFilter, clearList);
  }
  setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  addEvent = (changeFilter, clearList) => {
    this.$target.addEventListener('click', async (event) => {
      const { target } = event;
      if (target.classList.contains('selected')) return;
      if (target.classList.contains('all')) {
        changeFilter(ALL);
      } else if (target.classList.contains('active')) {
        changeFilter(false);
      } else if (target.classList.contains('completed')) {
        changeFilter(true);
      } else if (target.classList.contains('clear-completed')) {
        const id = this.state.user._id;
        await this.dataController.deleteData(USER_API + `/${id}/items`);
        clearList();
      }
    });
  };

  render() {
    this.$target.querySelector('.selected').classList.remove('selected');
    this.$target
      .querySelector(`.${currentFilter[this.state.filter]}`)
      .classList.add('selected');
    const numberElement = this.$target.querySelector('strong');
    const { filter } = this.state;
    const totalLength = this.state.user.todoList.length;

    if (filter === ALL) {
      numberElement.textContent = totalLength;
      return;
    }

    const completedItems = this.state.user.todoList.filter(
      (item) => item.isCompleted === true
    );

    numberElement.textContent =
      filter === COMPLETE
        ? completedItems.length
        : totalLength - completedItems.length;
  }
}

export default TodoCount;
