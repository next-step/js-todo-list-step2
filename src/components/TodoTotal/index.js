import Component from "../component.js";
import { countTodosLength } from "./helpers.js";
export default class TodoTotal extends Component {
  constructor($app, props) {
    super();
    this.$app = $app;
    this.props = props;
    this.mount();
    this.render();
  }
  mount() {}
  render() {
    const { todos, userId } = this.props.getState();
    this.$app.innerHTML = `총 <strong>${countTodosLength(todos, userId)}</strong> 개`;
  }
}
