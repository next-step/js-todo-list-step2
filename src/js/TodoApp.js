import todo from './store/todo.js';
import user from './store/user.js';
import User from './User.js';
import TodoList from './TodoList.js';
import TodoInput from './TodoInput.js';
import TodoItem from './TodoItem.js';

function TodoApp() {
  this.selectedUserId = ''
  this.todoItems = [];
  this.todoInput = {};
  this.todoList = {};
  this.user = {};

  this.load = async() => {
    this.user = await new User();
    await this.user.init();
    this.selectedUserId = await todo.init();
    console.log(this.selectedUserId);
    this.todoItems = await todo.getAll(); 
    console.log(this.todoItems);
  };

  this.update = async () => {
    this.user.updateData();
  }

  this.drawComponents = async() => {
    this.todoInput = new TodoInput({
      onAdd: async (contents) => {
        if (!contents) return;
        const newTodoItem = new TodoItem(contents);
        const newTodo = await todo.create(newTodoItem);
        console.log(newTodo);
        this.setState(this.todoItems);
        setTodoData('items', this.todoItems);
      }  
    });
    
    this.todoList = new TodoList({
      onToggle: (id) => {
        const toggleItem = this.todoItems.find((item) => item.id === id);
        toggleItem.completed = !toggleItem.completed;
        this.setState(this.todoItems);
        setTodoData('items', this.todoItems);
      },
      onDelete: (id) => {
        const deletedItemIndex = this.todoItems.findIndex((item) => item.id === id);
        this.todoItems.splice(deletedItemIndex, 1);
        this.setState(this.todoItems);
        setTodoData('items', this.todoItems);
      },
      onEdit: (contents, id) => {
        const editItem = this.todoItems.find((item) => item.id === id);
        editItem.todo = contents;
        this.setState(this.todoItems);
      }
    });
  }
  
  this.setState = (updatedItems) => {
    this.todoList.setState(updatedItems)
  }

  this.init = async() => {
    await this.load();
    await this.drawComponents();
    this.setState(this.todoItems);
  } 


}

new TodoApp().init();