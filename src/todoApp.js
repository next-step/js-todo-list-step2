import TodoContainer from "./components/TodoContainer.js";
import TodoInput from "./components/TodoInput.js";
import TodoList from "./components/TodoList.js";
import UserList from "./components/UserList.js";
import {$} from "./components/utils.js";
import Component from "./core/Component.js";
import { addTodo, deleteTodo, updateTodo, setPriorityTodo, getTodolist, toggleTodo, deleteTodoList } from "./components/todos.js";
import { getUserList, addUser, getUser, deleteUser } from "./components/users.js";


export default class todoApp extends Component { //객체 생성 함수
   
    setup() {
       
        this.$state = {
            isLoading: false,
            _id: 1,
            name: "empty",
            todoList: [
                {
                    _id: 1,
                    contents: "empty",
                    isCompleted: false,
                    priority: "NONE"
                }
            ],
        };
        this.init();
    }
    async init() {
        const data = await getUserList();
        this.$users = data;
        this.setState(data[0]);
        
    }
    template() {
        const {  name } = this.$state;
        return `
        <h1 id="user-title" data-username=${name}>
        <span><strong>${name}</strong>'s Todo List</span>
      </h1>
      <section>
        <div id="user-list">
        </div>
      </section>
      <section class="todoapp">
        <section class="input-container">
        </section>
        <section class="main">
          <ul class="todo-list">
          </ul>
        </section>
        <div class="count-container">
        </div>
      </section>
      `
    }
    

    
    mount() {
        const { onAddTodo, onAddUser, onDeleteTodo, onDeleteTodoList,
            onDeleteUser, onFilterTodo, onGetUser, onSetPriorityTodo,
            onToggleTodo, onUpdateTodo , Users }
            = this;
        const {_id:currentId, name, todoList} = this.$state;

        const $todoInput = $(".input-container");
        const $todoList = $(".todo-list");
        const $todoCount = $(".count-container");
        const $userList = $("#user-list");
        new UserList($userList, {
            Users,
            currentId,
            onAddUser: onAddUser.bind(this),
            onGetUser: onGetUser.bind(this),
            onDeleteUser: onDeleteUser.bind(this),

        })
        new TodoInput($todoInput, {
            onAddTodo: onAddTodo.bind(this)
        });
        new TodoList($todoList, {
            todoList,
            currentId,
            onDeleteTodo: onDeleteTodo.bind(this),
            onSetPriorityTodo: onSetPriorityTodo.bind(this),
            onToggleTodo: onToggleTodo.bind(this),
            onUpdateTodo: onUpdateTodo.bind(this)
                     
        });
        new TodoContainer($todoCount, { //todocount와 filter를 가지는 컨테이너
            itemCount: todoList.length,
            onDeleteTodoList: onDeleteTodoList.bind(this),
            onFilterTodo : onFilterTodo.bind(this)
        });
    }
    get Users() {
        return this.$users;
    }
  
    async onAddUser(name) {
     
        const data = await this.API.addUser(name);
        this.$users = [...this.$users, data];
        this.setState(data);
        
        
    }
    async onDeleteUser(userid) {

        await deleteUser(userid);
        const index = this.$users.findIndex(user => user._id === userid);
        this.$users.splice(index, 1);
        await this.init();
    }
    
    async onGetUser(userid) {
        const data = await getUser(userid);
        this.setState(data);
    }
    async onAddTodo(contents) {

        const { _id , todoList} = this.$state;
        await addTodo(_id, contents);
        const data = await getUser(_id);
        this.setState(data);
    }
    async onDeleteTodo(itemid) {
   
        const { _id } = this.$state;
        const data = await deleteTodo(_id, itemid);
        this.setState(data);
    }
    async onDeleteTodoList() {
     
        const { _id } = this.$state;
        const data = await deleteTodoList(_id);
        this.setState(data);
    }
    async onUpdateTodo(itemid, contents) {
      
        const { _id, todoList } = this.$state;
        await updateTodo(_id, itemid, contents);
        const data = await getUser(_id);
        this.setState(data);
    }
    async onToggleTodo(itemid) {
       
        const { _id, todoList } = this.$state;
        await toggleTodo(_id, itemid);
        const data =await getUser(_id);
        this.setState(data);
    }
    async onSetPriorityTodo(itemid, priority) {
        const { _id } = this.$state;
        await setPriorityTodo(_id, itemid, priority);
        const data =await getUser(_id);
        this.setState(data);
    }
    async onFilterTodo(classname) {
        const { _id,todoList } = this.$state;
        const filter = {
            active: () => todoList.filter(({ isCompleted }) => !isCompleted),
            completed: () => todoList.filter(({ isCompleted }) => isCompleted),
            all: () =>  todoList
        }
        const data = await getUser(_id);
        data.todoList = [...filter[classname]];
        this.setState(data);
    }   
  
}



