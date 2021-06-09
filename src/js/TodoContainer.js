import todo from './store/todo.js';
import user from './store/user.js';
import TodoList from './TodoList.js';
import TodoInput from './TodoInput.js';
import TodoCount from './TodoCount.js';
import TodoFilter from './TodoFilter.js';

export default function TodoContainer() {
  this.selectedUserId = ''
  this.todoItems = [];
  this.todoInput = {};
  this.todoList = {};
  this.user = {};

  this.load = async() => {
    this.selectedUserId = await todo.init();
    this.todoItems = await todo.getAll(); 
  };

  this.update = async () => {
    this.selectedUserId = await todo.init();
    this.todoItems = await todo.getAll();
    this.setState();
  }

  this.drawComponents = async() => {
    this.todoCount = new TodoCount();
    
    this.todoFilter = new TodoFilter({
      onRenderAll: async () => {
        await this.update();
      },
      onActive: async () => {
        console.log(this.todoItems)      
        const temp = await todo.getAll()
        this.todoItems = temp.filter(item => !item.isCompleted); 
        this.setState()
      },
      onCompleted: async () => {
        console.log(this.todoItems)      
        const temp = await todo.getAll()
        this.todoItems = temp.filter(item => item.isCompleted); 
        this.setState()
      },
    });

    this.todoInput = new TodoInput({
      onAdd: async (contents) => {
        if (!contents) return;
        await todo.create(contents);
        await this.update();
      }  
    });
    
    this.todoList = new TodoList({
      onToggle: async (id) => {
        const toggleItem = this.todoItems.find((item) => item._id === id);
        toggleItem.isCompleted = !toggleItem.isCompleted;
        await todo.toggle(id);
        await this.update();
      },
      onDelete: async (id) => {
        await todo.deleteTodo(id);
        await this.update();
      },
      onDeleteAll: async () => {
        await todo.deleteAll();
        await this.update();
      },

      onEdit: async (id, contents) => { 
        const editItem = this.todoItems.find((item) => item._id === id);
        editItem.contents = contents;
        await todo.edit(id, contents)
        await this.update();
      }
    });
  }
  
  this.setState = () => {
    this.todoList.setState(this.todoItems);
    this.todoCount.setState(this.todoItems.length);
  }

  this.init = async() => {
    await this.load();
    await this.drawComponents();
    this.setState(this.todoItems);
  } 
}
