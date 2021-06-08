import UserContainer from './UserContainer.js'
import TodoContainer from './TodoContainer.js'

function TodoApp() {
  this.user = new UserContainer({
    onUpdateUser: () => {
      this.todo.update();
    }
  });
  this.todo = new TodoContainer();
  
  this.init = async () => {
    await this.user.init();
    await this.todo.init();
  }

}

new TodoApp().init();