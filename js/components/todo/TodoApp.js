import UserList from "../users/UserList.js";
import {requestUserList} from "../../utils/APIs.js";
import TodoItem from "./TodoItem.js";
import TodoInput from "./TodoInput.js";
import Validation from "../../utils/Validation.js";
import TodoCount from "./TodoCount.js";

export default function TodoApp() {

  this.state = {
    _id: "",
    name: "",
    todoList: []
  }

  this.renderTodoItem = props => {
    new TodoItem(props).renderItem();
  }

  this.renderTodoItemCount = count => {
    new TodoCount().changeCount(count);
  }

  const updateTodoItem = ({_id, contents, isCompleted, priority}) => {
    const {_id: userId, name, todoList} = this.state;
    const newTodoList = todoList.map(v => {
      if (!Validation.equalsTo(v._id, _id)) return v;
      return {_id, contents, isCompleted, priority};
    })
    this.renderTodoItem({_id: userId, todoList: newTodoList, updateTodoItem});
    setState({_id: userId, name, todoList: newTodoList});

  }

  const loadUserData = ({_id, name, todoList}) => {
    _TodoInput.changeId(_id);
    this.renderTodoItem({_id, todoList, updateTodoItem})
    this.renderTodoItemCount(todoList.length)
    setState({_id, name, todoList});
  }

  const refreshTodoList = todoList => {
    const {_id} = this.state
    this.renderTodoItem({_id, todoList, updateTodoItem})
    this.renderTodoItemCount(todoList.length)
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