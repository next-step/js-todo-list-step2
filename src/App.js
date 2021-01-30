import { createElement } from "./utils/createElement.js";

import UserTitle from "./component/UserTitle.js";
import UserList from "./component/UserList.js";

const template = () => `
  <div>
    <h1 id="user-title"></h1>
    <section id="user-list"></section> 
    <section class="todoapp">
      <section class="input-container">
        <input
          class="new-todo"
          placeholder="할 일을 입력해주세요."
          autofocus
        />
      </section>
      <section class="main">
        <ul class="todo-list">
        </ul>
      </section>
      <div class="count-container">
        <span class="todo-count">총 <strong>0</strong> 개</span>
        <ul class="filters">
          <li>
            <a href="/#" class="all selected">전체보기</a>
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
    </section>
  </div>
`;

export default function App() {
  const $dom = createElement(template());
  const $userTitle = $dom.querySelector("#user-title");
  const $userList = $dom.querySelector("#user-list");

  const init = () => {
    $userTitle.appendChild(new UserTitle());
    $userList.appendChild(new UserList());
  };

  init();

  return $dom;
}
