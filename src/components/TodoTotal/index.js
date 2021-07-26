import Component from "../component.js";
import { countTodosLength } from "./helpers.js";
export default class TodoTotal extends Component {
  constructor($app, props) {
    super($app, props);
  }
  mount() {}
  render() {
    const { users, userId } = this.props.getState();
    this.$app.innerHTML = `총 <strong>${countTodosLength(users, userId)}</strong> 개`;
  }
}
