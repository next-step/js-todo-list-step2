import {
  updateTodoAPI,
  deleteTodoAPI,
  updateTodoPriorityAPI,
  updateTodoCompletedAPI,
} from "../../api/requests.js";
import { $, $all } from "../../utils/selectors.js";
import Component from "../component.js";
import { currentTodos, deletedTodos, updateTodos } from "./helpers.js";
import { PRIORITY } from "./constants.js";
export default class TodoItems extends Component {
  constructor($app, props) {
    super();
    this.$app = $app;
    this.props = props;
    this.state = "";
    this.mount();
    this.render();
  }
  mount() {
    this.$app.addEventListener("click", async (e) => {
      if (e.target.className === "toggle") {
        const { id } = e.target.closest(".view").dataset;
        const state = this.props.getState();
        const toggledTodo = await updateTodoCompletedAPI(state.userId, id);
        if (toggledTodo) {
          const newState = updateTodos(toggledTodo, state);
          this.props.setState(newState);
        }
      }
      if (e.target.className === "destroy") {
        const state = this.props.getState();
        const deletedTodo = await deleteTodoAPI(
          state.userId,
          e.target.closest(".view").dataset.id
        );
        if (deletedTodo) {
          const newState = deletedTodos(deletedTodo, state);
          this.props.setState(newState);
        }
      }
    });
    this.$app.addEventListener("dblclick", (e) => {
      if (e.target.className === "label") {
        e.target.closest("li").className = "editing";
      }
    });
    this.$app.addEventListener("change", async (e) => {
      if (e.target.className === "chip select") {
        const { id } = e.target.closest(".view").dataset;
        const state = this.props.getState();
        const priorityTodo = await updateTodoPriorityAPI(state.userId, id, {
          priority: PRIORITY[e.target.value],
        });
        if (priorityTodo) {
          const newState = updateTodos(priorityTodo, state);
          this.props.setState(newState);
        }
      }
    });
    document.body.addEventListener("keydown", async (e) => {
      if (e.key === "Escape") {
        const { id: itemId, contents } = $(".view").dataset;
        const inputValue = $(".edit").value;
        const state = this.props.getState();
        if (contents !== inputValue) {
          const updatedTodo = await updateTodoAPI(state.userId, itemId, {
            contents: inputValue,
          });
          const newState = updateTodos(updatedTodo, state);
          this.props.setState(newState);
        }
      }
    });
  }
  render() {
    const state = this.props.getState();
    const curTodos = currentTodos(state);
    this.$app.innerHTML = curTodos
      .map(({ _id, contents, isCompleted, priority }) => {
        return `<li ${isCompleted ? `class="completed"` : ``}>
          <div class="view" data-id="${_id}" data-contents="${contents}" data-priority="${priority}">
          <input class="toggle" type="checkbox" ${isCompleted && "checked"}/>
          <label class="label">
          ${
            priority === "NONE"
              ? `<select class="chip select">
                  <option value="0" selected>순위</option>
                  <option value="1">1순위</option>
                  <option value="2">2순위</option>
                </select>`
              : `<span class="chip ${
                  priority === "FIRST" ? "primary" : "secondary"
                }">${priority === "FIRST" ? "1" : "2"}순위</span>`
          }${contents}</label><button class="destroy""></button></div>
        <input class="edit"" value="${contents}" />
      </li>
      <li>`;
      })
      .join("");
  }
}
