const TodoApp = class {

  constructor({
    userTitleTarget,
    userListTarget,
    todoInputTarget,
    todoListTarget,
    todoFooterTarget
  }) {
    new UserTitle(userTitleTarget);
    new UserList(userListTarget);
    new TodoInput(todoInputTarget);
    new TodoList(todoListTarget);
    new TodoFooter(todoFooterTarget);
  }

}

new TodoApp({
  userTitleTarget: document.querySelector('#user-title'),
  userListTarget: document.querySelector('#user-List'),
  todoInputTarget: document.querySelector('.new-todo'),
  todoListTarget: document.querySelector('.todo-list'),
  todoFooterTarget: document.querySelector('.count-container'),
})