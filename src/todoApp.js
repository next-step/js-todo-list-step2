import TodoContainer from "./components/TodoContainer.js";
import TodoInput from "./components/TodoInput.js";
import TodoList from "./components/TodoList.js";
import {$} from "./components/utils.js";
import Component from "./core/Component.js";
import { addTodo, deleteTodo, updateTodo, setPriorityTodo, getTodolist, toggleTodo, deleteTodoList } from "./components/todos.js";
import { getUsers, addUser, getUser, deleteUser } from "./components/users.js";

export default class todoApp extends Component { //객체 생성 함수
    $users;
    setup() {
        this.init();
        

    }
    async init() {
        try {
            const data = await getUsers();
            this.$users = data;
            this.setState(data[0]);
        } catch (error) {
            console.error(error);
        }
    }
    template() {
        const { name } = this.$state;
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


    
    mounted() {
        const { onAddTodo, onAddUser, onDeleteTodo, onDeleteTodoList,
            onDeleteUser, onFilterTodo, onGetUser, onSetPriorityTodo,
            onToggleTodo, onUpdateTodo }
            = this;
        const [...$users] = this.$users;
        const { todoList} = this.$state;

        const $todoInput = $(".input-container");
        const $todoList = $(".todo-list");
        const $todoCount = $(".count-container");
        const $userList = $(".user-list");
        new UserList($userList, {
            $users,
            onAddUser: onAddUser.bind(this),
            onGetUser: onGetUser.bind(this),
            onDeleteUser: onDeleteUser.bind(this),

        })
        new TodoInput($todoInput, {
            onAddTodo: onAddTodo.bind(this)
        });
        new TodoList($todoList, {
            onDeleteTodo: onDeleteTodo.bind(this),
            onSetPriorityTodo: onSetPriorityTodo.bind(this),
            onToggleTodo: onToggleTodo.bind(this),
            onUpdateTodo: onUpdateTodo.bind(this),
            todoList            
        });
        new TodoContainer($todoCount, { //todocount와 filter를 가지는 컨테이너
            itemCount: todoList.length,
            onDeleteTodoList: onDeleteTodoList.bind(this),
            onFilterTodo : onFilterTodo.bind(this)
        });
    }
  
    async onAddUser(name) {
        try {
            const data = await addUser(name);
            this.setState(data);
            this.$users.push(data);
        } catch (error) {
            console.error(error)
        }
    }
    async onDeleteUser(userid) {
        
        try {
            await deleteUser(userid);
            await this.init();
        } catch (error) {
            console.error(error)
        }
    }
    
    async onGetUser(userid) {
        try {
            const data = await getUser(userid);
            this.setState(data);
        } catch (error) {
            console.error(error)
        }
    }
    async onAddTodo(contents) {
        try {
            const { _id } = this.$state;
            const data = await addTodo(_id, contents);
            this.setState({ todoList: [...todoList, data] });
        } catch (error) {
            console.error(error)     
        }
    }
    async onDeleteTodo(itemid) {
        try {
            const { _id, todoList } = this.$state;
            const data = await deleteTodo(_id, itemid);
            this.setState(data);
        } catch (error) {
            console.error(error)
        }
    }
    async onDeleteTodoList() {
        try {
            const { _id } = this.$state;
            const data = await deleteTodoList(_id);
            this.setState(data);
        } catch (error) {
            console.error(error)
        }
    }
    async onUpdateTodo(itemid, contents) {
        try {
            const { _id } = this.$state;
            const data = await updateTodo(_id, itemid, contents);
            this.setState({ todoList: [...todoList, data] });
        } catch (error) {
            console.error(error)
        }
    }
    async onToggleTodo(itemid) {
        try {
            const { _id, todoList } = this.$state;
            const data = await toggleTodo(_id, itemid);
            this.setState({ todoList: [...todoList, data] });
        } catch (error) {
            console.error(error) 
        }
    }
    async onSetPriorityTodo(itemid, priority) {
        const { _id } = this.$state;
        await setPriorityTodo(itemid, priority);
        const data =await getUser(_id);
        this.setState(data);
    }
    async onFilterTodo(classname) {
        const { todoList } = this.$state;
        const filter = {
            active: () => todoList.filter(({ isCompleted }) => !isCompleted),
            completed: () => todoList.filter(({ isCompleted }) => isCompleted),
            all: () =>  todoList
        }

        this.setState({ todoList: { ...filter[classname] }});
    }   

   
}



