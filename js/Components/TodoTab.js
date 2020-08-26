import { NODE, CLASS_NAME } from '../utils/constants.js';
import { checkTarget } from '../utils/validator.js';

function TodoTab({ $target, selectedTab, onChangeTab }) {
  this.init = () => {
    checkTarget($target);
    this.$target = $target;
    this.$tabs = this.$target.querySelectorAll('a');

    this.selectedTab = selectedTab;

    this.bindEvents();
  };

  this.bindEvents = () => {
    this.$target.addEventListener('click', this.onClick);
  };

  this.onClick = (e) => {
    e.preventDefault();
    if (e.target.nodeName !== NODE.A) return;

    const clickedTab = e.target.className;
    if (clickedTab.includes(CLASS_NAME.SELECTED)) return;

    this.changeTabsClassList(e.target);
    onChangeTab(clickedTab);
  };

  this.changeTabsClassList = ($target) => {
    for (const tab of this.$tabs) {
      tab.classList.remove(CLASS_NAME.SELECTED);
    }
    $target.classList.add(CLASS_NAME.SELECTED);
  };

  this.setState = (nextState) => {
    this.selectedTab = nextState;
  };

  this.init();
}

export default TodoTab;
