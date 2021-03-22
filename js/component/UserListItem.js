import Component from "../core/Component.js";

export default class TodoFilterItem extends Component {
  render() {
    const { _id, active, name } = this.props;

    return `
      <button 
        class="ripple  ${active ? " active" : ""}"
        data-id=${_id}
        data-action="selectUser"
      >
        ${name}
      </button>
  `;
  }
}
