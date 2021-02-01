import Component from '../../lib/component.js';
import store from '../../store/index.js';

const UserName = class extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector('#user-title'),
    });
  }

  render() {
    if(!store.state.selectedUserName)return;
    this.element.setAttribute('data-username', store.state.selectedUserName);
    this.element.innerHTML = `
        <span><strong>${store.state.selectedUserName}</strong>'s Todo List</span>
    `;
  }
};
export default UserName;
