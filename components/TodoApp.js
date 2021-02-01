
import { userService } from '../js/user.service.js'
import { TodoUsers } from './TodoUsers.js'
import { TodoList } from './TodoList.js'
import { TodoInput } from './TodoInput.js';
import { TodoTotalCount } from './TodoTotalCount.js';


export function TodoApp($div) {
    
    this.users = [];
    this.selectedUser = {};
    this.filter = 'all';

    this.todoUsers = new TodoUsers($div, this);
    this.todoList = new TodoList($div, this);
    this.todoInput = new TodoInput($div, this);
    this.todoTotalCount = new TodoTotalCount($div, this);

    this.setState = async() => {
        this.users = await userService.findAllUsers();
        setUpActive();

        this.render(this.filter);
    }

    this.registerUser = async (userName) => {
        const savedUser = await userService.saveUser(userName);
        this.users.push(savedUser);

        this.render(this.filter);
    }

    this.findTodosByUser = async(userId) => {
        setUpActive();
        const responseTodoItems = await userService.findTodoItemsByUser(userId);
        updateData(userId, responseTodoItems);

        this.render(this.filter);
    }
    const setUpActive = () => this.users.map(user => user.active = false);
    const updateData = (userId, responseTodoItems) => {
        const selected = this.users.find(user => user._id === userId);
        selected.todoList = responseTodoItems;
        selected.active = !selected.active;
        this.selectedUser = selected;
    }

    this.saveItem = async(todoItem) => {
       const savedTodoItem = await userService.saveItem(this.selectedUser._id, todoItem);
       this.selectedUser.todoList.push(savedTodoItem);

       this.render(this.filter);
    }

    this.complete = async(todoItemId) => {
        const updatedItems = await userService.completeTodoItem(this.selectedUser._id, todoItemId);
        updateUserTodoItems(updatedItems);

        this.render(this.filter);
    }

    this.deleteTodoItem = async(todoItemId) => {
        const updatedItems = await userService.deleteItem(this.selectedUser._id, todoItemId);
        updateUserTodoItems(updatedItems);

        this.render(this.filter);
    }

    this.deleteAll = async() => {
        const updatedItems = await userService.deleteAll(this.selectedUser._id);
        updateUserTodoItems(updatedItems);

        this.render(this.filter);
    }

    this.updateContents = async(updateItem) => {
        const updatedItem = await userService.updateContents(this.selectedUser._id, updateItem);
        this.selectedUser.todoList
                .filter(todoItem => todoItem._id === updatedItem._id)
                .map(todoItem => todoItem.contents = updatedItem.contents)

        this.render(this.filter);
    }

    const updateUserTodoItems = (updatedItems) => {
        this.users.filter(user => user._id === this.selectedUser._id)
            .map(user => user.todoList = updatedItems);
    }

    this.render = (filterStatus) => {

        this.filter = filterStatus;
        const status = {
          all: () => this.selectedUser.todoList,
          active: () => this.selectedUser.todoList.filter(todoItem => !todoItem.isCompleted),
          completed: () => this.selectedUser.todoList.filter((todoItem) => todoItem.isCompleted),
        };
        const todoItems = status[this.filter]();
        console.log(todoItems);

        this.todoUsers.render(this.users);
        this.todoList.render(todoItems);
        this.todoTotalCount.render(todoItems, this.filter);
    }

}