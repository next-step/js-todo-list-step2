import { createTodoAPI } from "../../api/requests.js";
import Component from "../component.js";
import { AddedTodos } from "./helpers.js";

export default class TodoInput extends Component {
  constructor($app, props) {
    super();
    this.$app = $app;
    this.props = props;
    this.mount();
    this.render();
  }
  mount() {
    this.$app.addEventListener("keyup", async (e) => {
      if (e.code === "Enter") {
        const state = this.props.getState();
        const newTodo = await createTodoAPI(state.userId, {
          contents: e.target.value,
        });
        if (newTodo) {
          const newState = AddedTodos(newTodo, state);
          e.target.value = "";
          this.props.setState(newState);
        }
      }
    });
  }
}
