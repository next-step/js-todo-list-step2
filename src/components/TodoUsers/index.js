import Component from "../component.js";
import { buildTodos, updateUserTodos } from "./helpers.js";
import {
  createUserAPI,
  deleteUserAPI,
  getUserTodoAPI,
} from "../../api/requests.js";
import { ERRORMESSAGE } from "../../utils/constants.js";
export default class TodoUsers extends Component {
  constructor($app, props) {
    super($app, props);
  }
  mount() {
    this.$app.addEventListener("click", async (e) => {
      if (e.target.className === "ripple") {
        const state = this.props.getState();
        const { id, name } = e.target.dataset;
        const newUserTodos = await getUserTodoAPI(id);
        const newState = updateUserTodos(newUserTodos, state, id, name);
        this.props.setState(newState);
      }
      if (e.target.dataset.action === "createUser") {
        const newUserName = window.prompt("추가하고 싶은 이름을 입력해주세요.");
        if (newUserName.length < 2) {
          alert(ERRORMESSAGE.MININPUT);
          return;
        }
        if (newUserName) {
          const { users } = this.props.getState();
          const newUser = await createUserAPI({ name: newUserName });
          const newState = {
            users: [newUser, ...users],
            userName: newUser.name,
            userId: newUser._id,
          };
          this.props.setState(newState);
        }
      }
      if (e.target.dataset.action === "deleteUser") {
        const state = this.props.getState();
        const wantDelete = window.confirm(
          `${state.userName}을 삭제하시겠습니까`
        );
        if (wantDelete) {
          const isDeleted = await deleteUserAPI(state.userId);
          if (isDeleted) {
            const newState = buildTodos(state);
            this.props.setState(newState);
          }
        }
      }
    });
  }
  render() {
    const { users } = this.props.getState();
    const usersTemplate =
      users.length &&
      users
        .map((user) => {
          return `<button class="ripple" data-name="${user.name}" data-id=${user._id}>${user.name}</button>`;
        })
        .join("");

    this.$app.innerHTML = `${usersTemplate}
    <button class="ripple user-create-button" data-action="createUser">
      + 유저 생성
    </button>
    <button class="ripple user-delete-button" data-action="deleteUser">
      삭제 -
    </button>`;
  }
}
