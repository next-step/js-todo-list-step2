import { todoCountHTML } from '../utils/template.js';
import { CLASS_NAME, MESSAGE } from '../utils/constants.js';
import { checkTarget } from '../utils/validator.js';

function TodoCount({ $target, todoCountState }) {
  this.init = () => {
    checkTarget($target);
    this.$target = $target;

    const { todos, selectedTab } = todoCountState;
    this.todos = todos;
    this.selectedTab = selectedTab;

    this.render();
  };

  this.getTodoCount = (selectedTab) => {
    switch (selectedTab) {
      case CLASS_NAME.ALL:
        return this.todos.length;

      case CLASS_NAME.ACTIVE:
        return this.todos.filter(({ isCompleted }) => !isCompleted).length;

      case CLASS_NAME.COMPLETED:
        return this.todos.filter(({ isCompleted }) => isCompleted).length;

      default:
        console.error(`TodoCount Render Error : ${MESSAGE.UNDEFINED_TAB}`);
        return;
    }
  };

  this.setState = (nextState) => {
    const { todos, selectedTab } = nextState;

    this.todos = todos;
    this.selectedTab = selectedTab;

    this.render();
  };

  this.render = () => {
    const count = this.getTodoCount(this.selectedTab);
    this.$target.innerHTML = todoCountHTML(count);
  };

  this.init();
}

export default TodoCount;
