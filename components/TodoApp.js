import UserList from './UserList.js'
import userApi from '../apis/userApi.js'

export default function TodoApp($el) {
  this.$el = $el
  this.components = []
  this.state = {
    todoItems: ['study', 'blog'],
    users: [],
  }

  this.render = () => {
    const { name: activeUserName } = this.state.users.find(({ active }) => true)

    this.$el.innerHTML = `
      <h1 id="user-title" data-username="${activeUserName}">
        <span><strong>${activeUserName}</strong>'s Todo List</span>
      </h1>
      <section>
        <div id="user-list"></div>
      </section>
    
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
            <li>
              <div class="view">
                <label class="label">
                  <div class="animated-background">
                    <div class="skel-mask-container">
                      <div class="skel-mask"></div>
                    </div>
                  </div>
                </label>
              </div>
            </li>
            <li>
              <div class="view">
                <input class="toggle" type="checkbox" />
                <label class="label">
                  <select class="chip select">
                    <option value="0" selected>순위</option>
                    <option value="1">1순위</option>
                    <option value="2">2순위</option>
                  </select>
                  해야할 아이템
                </label>
                <button class="destroy"></button>
              </div>
              <input class="edit" value="완료된 타이틀" />
            </li>
            <li>
              <div class="view">
                <input class="toggle" type="checkbox" />
                <label class="label">
                  <span class="chip primary">1순위</span>
                  해야할 아이템
                </label>
                <button class="destroy"></button>
              </div>
              <input class="edit" value="완료된 타이틀" />
            </li>
            <li>
              <div class="view">
                <input class="toggle" type="checkbox" />
                <label class="label">
                  <span class="chip secondary">2순위</span>
                  해야할 아이템
                </label>
                <button class="destroy"></button>
              </div>
              <input class="edit" value="완료된 타이틀" />
            </li>
            <li class="completed">
              <div class="view">
                <input class="toggle" type="checkbox" checked />
                <label class="label">완료된 아이템 </label>
                <button class="destroy"></button>
              </div>
              <input class="edit" value="완료된 타이틀" />
            </li>
            <li class="editing">
              <div class="view">
                <input class="toggle" type="checkbox" checked />
                <label class="label">
                  <span class="chip secondary">2순위</span>
                  수정중인 아이템
                </label>
                <button class="destroy"></button>
              </div>
              <input class="edit" value="완료된 타이틀" />
            </li>
          </ul>
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
      </section>
        `

    const userList = new UserList(this.$el.querySelector('#user-list'), {
      users: this.state.users,
    })
  }

  this.fetchUsers = () => {
    userApi.getUsers().then((users) => {
      this.state.users = users.map((user, index) => {
        return {
          ...user,
          active: index === 0,
        }
      })
      this.render()
    })
  }

  this.fetchUsers()
}
