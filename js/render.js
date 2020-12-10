import App from './components/app.js';
import User from './components/User.js';
import Task from './components/task.js';
import {
  addUser,
  addUserTodo, deleteUser, deleteUserAllTodo,
  deleteUserTodo, getUser,
  getUserList, toggleTodoComplete,
  updateUserTodoContents,
  updateUserTodoPriority
} from './util/index.js'
import { PRIORITY } from './util/request.js'



class Renderer{
  constructor(app){
    this.app = app;
  }

  render(){
    this._render();
  }

  _render(){
    console.log('must be override')
  }
}

class DOMRenderer extends Renderer{
  constructor(parent, app){
    super(app);
    this.init();
    this.isEditMode = false;
    this.$userTitle = parent.querySelector('#user-title strong');
    this.$userList = parent.querySelector('#user-list');
    this.$newTodo = parent.querySelector('.new-todo');
    this.$todoCount = parent.querySelector('.todo-count strong');
    this.$filter = parent.querySelector('.count-container .filters');
    this.$todoList = parent.querySelector('.todo-list');
    this.$deleteBtn = parent.querySelector('.clear-completed');
    this.$userCreate = parent.querySelector('.user-create-button');
    this.$userDelete = parent.querySelector('.user-delete-button');
    this.addDomEvent();
  }

  async init(){
    const userList = await getUserList();
    this.app = App.load(userList);
    this.render();
  }

  addDomEvent(){
    this.$filter.addEventListener('click', (e) => this.changeSelection(e));
    this.$newTodo.addEventListener('keydown',  (e) => this.handleCreateTodo(e));
    this.$userCreate.addEventListener('click', () => this.onUserCreateHandler());
    this.$deleteBtn.addEventListener('click', () => this.handleDeleteAllTodo());
    this.$userDelete.addEventListener('click', () => this.handleDeleteUser());
  }
  async handleDeleteUser(){
    const user = this.currentUser;
    await deleteUser(user._id);
    this.app.removeUser(this.currentUser);
    this.currentUser = null;
    this.init();
    return;
  }

  async handleDeleteAllTodo(){
    await deleteUserAllTodo(this.userId);
    this.currentUser.clearTasks();
    this.render();
    return;
  }
  showLoadingBar(){
    const loadingHTML = `<li>
          <div class="view">
            <label class="label">
              <div class="animated-background">
                <div class="skel-mask-container">
                  <div class="skel-mask"></div>
                </div>
              </div>
            </label>
          </div>
        </li>`
    this.$todoList.innerHTML = loadingHTML;
  }
  async handleUserBtn(e){
    const userId = e.target.dataset.id;
    if(this.userId === userId) return;
    this.showLoadingBar();
    const resData = await getUser(userId);
    const newUser = User.load(resData);
    this.currentUser = newUser;
    this.userId = newUser._id;
    this.$userTitle.innerHTML = newUser.name;
    this.render();
  }
  createUserHTML(user){
    const button = document.createElement('button');
    button.classList.add('ripple');
    button.dataset.id = user._id;
    button.innerText = user.name;
    button.addEventListener('click',  (e) => this.handleUserBtn(e));
    this.$userList.appendChild(button);
    return;
  }
  async onUserCreateHandler(){
    const name = prompt("추가하고 싶은 이름을 입력해주세요.");
    if(name.trim().length < 3){
      alert('User의 이름은 최소 2글자 이상이어야 합니다.');
      return;
    }
    const userName = {name}
    const resData = await addUser(userName);
    const user = User.get(resData._id, resData.name);
    this.app.addUser(user);
    this.createUserHTML(user)
  }
  makePriorityTag(priority){
    const selectHTML =  `<select class="chip select">
                <option value="0" selected="">순위</option>
                <option value="1">1순위</option>
                <option value="2">2순위</option>
              </select>`
    const priorityHTML = {
      'NONE' : selectHTML,
      'FIRST' : '<span class="chip primary">1순위</span>',
      'SECOND' :  '<span class="chip secondary">2순위</span>'
    }
    return priorityHTML[priority]
  }
  async handleCreateTodo(e, task = null){
    e.stopPropagation();
    if(e.key === 'Escape'){
      this.escapeEditMode(e.target);
      return;
    }
    if(e.key !== 'Enter') return;
    const contents = e.target.value.trim();
    if(contents.length < 2) {
      alert('2글자 이상 입력하세요!')
      return;
    }
    const todo = {contents}
    if(task){
      await updateUserTodoContents(this.userId, task.getId(), todo);
      task.setContent(contents);
      this.isEditMode = false;
    }else{
      const resData = await addUserTodo(this.userId, todo);
      task = Task.get(resData._id, contents);
      this.currentUser.addTask(task);
    }
    e.target.value = '';
    this.render();
    return;
  }
  async handleTodo(e, task){
    e.stopPropagation();
    const target = e.target;
    if (target.classList.contains('edit')) {
      e.target.addEventListener('keydown', (e) => this.handleCreateTodo(e, task));
    }
    if (target.classList.contains('toggle')) {
      await toggleTodoComplete(this.userId, task.getId());
      task.toggle();
      this.render();
    }
    if (target.classList.contains('destroy')) {
      await deleteUserTodo(this.userId, task.getId());
      this.currentUser.removeTask(task);
      this.render();
    }
    return;
  }
  escapeEditMode(target) {
    target.closest('li') && target.closest('li').classList.remove('editing');
    this.isEditMode = false;
    return;
  }
  changeSelection(e){
    if(e.target.tagName !== 'A') return;
    const targetClass = e.target.classList;
    const selection = this.currentUser.getFilter();
    if (targetClass.contains(selection)) return false;
    this.$filter.querySelector('.' + selection).classList.remove('selected');
    targetClass.add('selected');
    this.currentUser.setFilter(targetClass[0]);
    this.render();
    return;
  }
  changeEditMode(e){
    if (e.target.classList.contains('label')) {
      if (!this.isEditMode) {
        this.isEditMode = true;
        const li = e.target.closest('li');
        li.setAttribute('class', 'editing')
      }
    }
  }
  async changeSelect(e, task){
    if(e.target.selectedIndex === 0) return false;
    const priority = PRIORITY[e.target.selectedIndex];
    const prior = {priority};
    await updateUserTodoPriority(this.userId, task._id, prior);
    task.setPriority(e.target.selectedIndex)
    this.render();
  }
  createTodoTask (task) {
    const li = document.createElement('li')
    li.classList.add = task.isCompleted && 'completed';
    li.dataset.id = task._id;
    const priorHTML = this.makePriorityTag(task.priority);
    li.innerHTML = `
            <div class="view">
                <input class="toggle" type="checkbox" ${task.isCompleted ? 'checked' : ''}/>
                <label class="label">
                  ${priorHTML}
                  ${task.contents}
                </label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value=${task.contents} />`
    li.addEventListener('click' , (e) => {
      this.handleTodo(e, task);
    });
    li.addEventListener('dblclick' , (e) => {
      this.changeEditMode(e);
    })
    li.querySelector('.chip').addEventListener('change', (e) => {
      this.changeSelect(e, task)
    })
    this.$todoList.appendChild(li);
    return;
  }

  _render () {
    const users = this.app.getUsers();

    this.$userList.innerHTML = '';
    users.forEach((user) => {
      if(!this.currentUser) {
        this.currentUser = user;
        this.$userTitle.innerHTML = this.currentUser.name;
      }
      this.createUserHTML(user);
    })
    this.userId = this.currentUser._id;
    this.$todoList.innerHTML = '';
    const tasks = this.currentUser.getTasks();
    this.currentUser.getTasks().forEach((task) => {
      this.createTodoTask(task)
    });
    this.$todoCount.innerHTML = tasks.length;
  }
}

new DOMRenderer(document,  new App());
