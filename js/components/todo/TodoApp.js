import UserList from "../users/UserList.js";
import {requestUserList} from "../../utils/APIs.js";
import TodoItem from "./TodoItem.js";
import TodoInput from "./TodoInput.js";
import Validation from "../../utils/Validation.js";

export default function TodoApp() {

  this.state = {
    _id: "",
    name: "",
    todoList: []
  }

  const updateTodoItem = ({_id, contents, isCompleted, priority}) => {
    console.log({_id, contents, isCompleted, priority})
    const {_id: userId, name, todoList} = this.state;
    const newTodoList = todoList.map(v => {
      if (Validation.equalsTo(v._id, _id)) {
        return {_id, contents, isCompleted, priority}
      }
      return v;
    })
    new TodoItem({_id: userId, todoList: newTodoList, updateTodoItem}).renderItem()
    setState({_id: userId, name, todoList: newTodoList});

  }

  const loadUserData = ({_id, name, todoList}) => {
    _TodoInput.changeId(_id);
    new TodoItem({_id, todoList, updateTodoItem}).renderItem()
    setState({_id, name, todoList});
  }

  const refreshTodoList = todoList => {
    const {_id} = this.state
    new TodoItem({_id, todoList, updateTodoItem}).renderItem()

    setState({...this.state, todoList});
  }

  const _TodoInput = new TodoInput({refreshTodoList});

  const setState = ({_id, name, todoList}) => {
    this.state = {_id, name, todoList};
  }

  this.start = async () => {
    const users = await requestUserList();
    _TodoInput.render();
    new UserList({users, loadUserData}).render();
  }
}