import {Component} from "../core/Component.js";
import {TodoList} from "../components/Todo/TodoList.js";

export const TodoContainer = class extends Component {

  render () {
    return `
      <section class="input-container">
        <input class="new-todo" placeholder="할 일을 입력해주세요." autofocus />
      </section>
      <section class="main">
        <ul id="TodoList" class="todo-list"></ul>
      </section>
      <div class="count-container">
        <span class="todo-count">총 <strong>0</strong> 개</span>
        <ul class="filters">
          <li>
            <a href="/#" class="all selected" >전체보기</a>
          </li>
          <li>
            <a href="#active" class="active">해야할 일</a>
          </li>
          <li>
            <a href="#completed" class="completed">완료한 일</a>
          </li>
        </ul>
        <button class="clear-completed">모두 삭제</button>
      </div>
    `;
  }

  componentDidMount () {
    const $todoList = document.querySelector('#TodoList');
    new TodoList($todoList, {
      todoList: this.$props.selectedUser.todoList
    })
  }

}