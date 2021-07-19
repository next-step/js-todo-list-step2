import { $ } from "../../utils/selectors.js";
import Component from "../component.js";

export default class TodoFilter extends Component {
  constructor($app, props) {
    super();
    this.$app = $app;
    this.props = props;
    this.mount();
    this.render();
  }
  mount() {
    this.$app.addEventListener("click", (e) => {
      const state = this.props.getState();
      this.props.setState({ ...state, filter: e.target.classList[0] });
    });
  }
  render() {
    const { filter } = this.props.getState();
    this.$app.innerHTML = `<li>
      <a href="#" class="all ${filter === "all" && "selected"}">전체보기</a>
    </li>
    <li>
      <a href="#active" class="active ${
        filter === "active" && "selected"
      }">해야할 일</a>
    </li>
    <li>
      <a href="#completed" class="completed ${
        filter === "completed" && "selected"
      }">완료한 일</a>
    </li>`;
  }
}
