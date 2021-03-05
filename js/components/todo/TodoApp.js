import UserList from "../users/UserList.js";
import {requestUserList} from "../../utils/APIs.js";
import TodoItem from "./TodoItem.js";

export default function TodoApp() {

  this.state = {
    _id : "",
    name : "",
    todoList : []
  }

  const loadUserData = ({_id, name, todoList}) => {
    new TodoItem().renderItem(todoList)
    setState({_id, name, todoList});
  }

  const setState = ({_id, name, todoList}) => {
    this.state = {_id, name, todoList};
  }

  this.start = async () => {
    const users = await requestUserList();
    new UserList({users, loadUserData}).render();
  }
}