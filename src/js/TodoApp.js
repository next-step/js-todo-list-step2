import todo from './storeTodo.js';
import user from './store.js';
import User from './User.js';
import TodoList from './TodoList.js';
import TodoInput from './TodoInput.js';
import TodoItem from './TodoItem.js';

function TodoApp() {
  this.selectedUserId = ''
  this.todoItems = [];

  this.load = async() => {
    await new User();
    await todo.init();
    this.selecteduserId = await user.getSelected();
    this.todoItems = await todo.getAll(); 
    console.log(this.todoItems);
  };

  const todoInput = new TodoInput({
    onAdd: async (contents) => {
      if (!contents) return;
      const newTodoItem = new TodoItem(contents);
      const newTodo = await todo.create(newTodoItem);
      console.log(newTodo);
      this.setState(this.todoItems);
      setTodoData('items', this.todoItems);
    }  
  });
  
  const todoList = new TodoList({
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

  this.setState = (updatedItems) => {
    todoList.setState(updatedItems)
  }




}

new TodoApp().load();