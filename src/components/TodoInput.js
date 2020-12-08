import {Component} from "../core/Component.js";
import {store} from "../modules/index.js";
import {fetchAddUserTodoItem} from "../modules/user/actions.js";

export default class TodoInput extends Component {
    addTodo(userId, content) {
        store.dispatch(fetchAddUserTodoItem.REQUEST({userId, content}));
    }

    setEvent(target) {
        target.addEventListener("keypress", ({key, target}) => {
            if (key === "Enter") {
                const { _id: userId } = store.getState().selectedUser;

                this.addTodo(userId, target.value);
                target.value = "";
            }
        })
    }
}
