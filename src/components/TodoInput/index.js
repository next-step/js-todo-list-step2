import { createTodoAPI } from "../../api/requests.js";
import { ERRORMESSAGE } from "../../utils/constants.js";
import Component from "../component.js";
import { AddTodos } from "./helpers.js";

export default class TodoInput extends Component {
  constructor($app, props) {
    super($app, props);
  }
  mount() {
    this.$app.addEventListener("keyup", async (e) => {
      if (e.code === "Enter") {
        if (e.target.value.length < 2) {
          alert(ERRORMESSAGE.MININPUT);
          e.target.value = "";
          return;
        }
        const state = this.props.getState();
        const newTodo = await createTodoAPI(state.userId, {
          contents: e.target.value,
        });
        if (newTodo) {
          const newState = AddTodos(newTodo, state);
          e.target.value = "";
          this.props.setState(newState);
        }
      }
    });
  }
}
