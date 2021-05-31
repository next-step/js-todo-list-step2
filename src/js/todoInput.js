import { $ } from "./util.js";
import {todoApi} from './api.js'
import {todoListComponent} from './todoList.js'

let user;

const addEventListener = () => {
  $('.new-todo').addEventListener('keypress', onKeypressHandler);
}

const onKeypressHandler = (e) => {
  console.log('onKeypressHandler')
  let contents = '';
  if(e.key === 'Enter' && e.target.value!== ''){
    contents = e.target.value;
    todoApi()
      .addTodo(user._id, contents)
      .then(response=>{
        user = response
      })
    console.log(user)
    todoListComponent(user.todoList)
    e.target.value ='';
  }
}

addEventListener();

export const todoInputComponent = (u) => {
  user = u;
  console.log(user)
}