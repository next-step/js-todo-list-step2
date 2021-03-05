import UserList from "../users/UserList.js";
import {requestUserList} from "../../utils/APIs.js";
import TodoItem from "./TodoItem.js";
import TodoInput from "./TodoInput.js";

export default function TodoApp() {

  this.state = {
    _id: "",
    name: "",
    todoList: []
  }

  const loadUserData = ({_id, name, todoList}) => {
    _TodoInput.changeId(_id);
    new TodoItem({_id, todoList}).renderItem()
    setState({_id, name, todoList});
  }

  const refreshTodoList = todoList => {
    const {_id} = this.state
    new TodoItem({_id, todoList}).renderItem()
    setState({...this.state, todoList});
  }

  const _TodoInput = new TodoInput({refreshTodoList});

  const setState = ({_id, name, todoList}) => {
    this.state = {_id, name, todoList};
    console.log(this.state)
  }

  this.start = async () => {
    const users = await requestUserList();
    _TodoInput.render();
    new UserList({users, loadUserData}).render();
  }
}