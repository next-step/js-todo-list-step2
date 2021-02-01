import {Component} from "../core/Component.js";
import {store} from "../modules/index.js";

export default class TodoListTitle extends Component{
    render() {
        const {selectedUser} = store.getState();
        const name = selectedUser ? selectedUser.name : "";

        return `<span><strong>${name}</strong>'s Todo List</span>`
    }
}