import Component from "../component.js";
import { deleteAllTodoAPI } from "../../api/requests.js";
import { deleteAllTodos } from "./helpers.js";

export default class TodoDeleteAll extends Component {
  constructor($app, props) {
    super();
    this.$app = $app;
    this.props = props;
    this.mount();
    this.render();
  }
  mount() {
    this.$app.addEventListener("click", async (e) => {
      const state = this.props.getState();
      const newUser = await deleteAllTodoAPI(state.userId);
      if (newUser) {
        const newState = deleteAllTodos(state);
        this.props.setState(newState);
      }
    });
  }
  render() {}
}
