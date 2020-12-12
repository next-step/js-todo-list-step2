import TodoList from "./TodoList.js";
import TodoInput from "./TodoInput.js";
import TodoCount from "./TodoCount.js";
import { addTodo, changeTodoPriority, checkTodo, deleteTodo, getTodoListByUserId, deleteAllTodos } from '../api/todoAPI.js';

export default function TodoApp($element){

    this.state = {
        todos: [],
        filter: 'all',
        loading: false,
    }
    this.userInfo = {};

    this.todoInput = null;
    this.todoList = null;
    this.todoCount = null;

    this.setUserInfo = (userInfo) => {
        this.userInfo = userInfo ?? {};
    }

    this.setState = ({ todos, filter, loading }) => {
        if(todos){
            this.state.todos = todos ?? [];
        }
        if(filter){
            this.state.filter = filter ?? 'all';
        }
        if(loading !== null && loading !== 'undefined'){
            this.state.loading = loading ?? false;
        }
        this.render();
    }

    this.filteredTodos = (filter = 'all') => {
        if(filter === 'active'){    
            return this.state.todos.filter(todo => !todo.isCompleted);
        }else if(filter === 'completed'){
            return this.state.todos.filter(todo => todo.isCompleted);
        }else{
            return this.state.todos;
        }
    }

    this.getTodoListByUserId = async () => {
        this.setState({
            todos: [],
            loading : true,
        })
        try{
            const todoList = await getTodoListByUserId(this.userInfo._id);
            this.setState({
                todos : todoList ?? [],
            })
        }catch(err){
            console.log('err', err)
        }
        this.setState({
            loading : false,
        })
    }
    
    this.init = () => {
        const $newTodo = $element.querySelector('#new-todo');
        const $todoList = $element.querySelector('#todo-list');
        const $todoCount = $element.querySelector('#count-container');

        this.todoInput = new TodoInput($newTodo,
            { 
                addTodo : async(title) => {
                    this.setState({
                        loading : true,
                    })
                    try{
                        const newTodos = await addTodo(this.userInfo._id, title);
                        this.setState({
                            todos: [...this.state.todos, newTodos],
                        })
                        }catch(err){
                            console.log('err', err);
                        }
                    this.setState({
                        loading : false,
                    })
                }
            }
        )

        this.todoList = new TodoList($todoList,
            {
                checkTodo : async(itemId) => {
                    this.setState({
                        loading : true,
                    })
                    try{
                        const response = await checkTodo(this.userInfo._id, itemId);
                        if(response){
                            const todos = this.state.todos.map( todo => {
                                if(todo._id === response._id){
                                    todo.isCompleted = response.isCompleted;
                                }
                                return todo;
                            });
                            this.setState({
                                todos 
                            })
                        }
                    }catch(err){
                        console.log("err", err);
                    }
                    this.setState({
                        loading : false,
                    })
                },
                deleteTodo : async(itemId) => {
                    this.setState({
                        loading : true,
                    })
                    try{
                        const response = await deleteTodo(this.userInfo._id, itemId);
                        if(response){
                            this.setState({
                                todos : response.todoList
                            })
                        }
                    }catch(err){
                        console.log("err", err);
                    }
                    this.setState({
                        loading : false,
                    })
                },
                editTodo : async(itemId, contents) => {
                    this.setState({
                        loading : true,
                    })
                    try{
                        const response = await editTodo(this.userInfo._id, itemId, contents);
                        if(response){
                            const todos = this.state.todos.map(todo => {
                                if(todo._id === response._id){
                                    todo.content = response.content;
                                }
                                return todo;
                            })
                            this.setState({
                                todos
                            })
                        }
                    }catch(err){
                        console.log("err", err);
                    }
                    this.setState({
                        loading : false,
                    })
                },
                changeTodoPriority : async(itemId, priority) => {
                    this.setState({
                        loading : true,
                    })
                    try{
                        const response = await changeTodoPriority(this.userInfo._id, itemId, priority);
                        if(response){
                            const todos = this.state.todos.map( todo => {
                                if(todo._id === response._id){
                                    todo.priority = response.priority;
                                }
                                return todo;
                            });
                            console.log("todos", todos);
                            this.setState({
                                todos 
                            })
                        }
                    }catch(err){
                        console.log("err", err);
                    }
                    this.setState({
                        loading : false,
                    })
                }
            }
        )

        this.todoCount = new TodoCount($todoCount,
            {
                filterTodo: (filter) => this.setState({
                    filter
                }),
                deleteAllTodos: async () => {
                    this.setState({
                        loading : true,
                    })
                    const response = await deleteAllTodos(this.userInfo._id);
                    if(response?.success === true){
                        this.setState({
                            todos: [],
                        })
                    }
                    this.setState({
                        loading : false,
                    })
                }
            }
        )
    }

    this.init();

    this.render = () => {
        const filteredTodos = this.filteredTodos(this.state.filter);
        this.todoInput.toggleLoading(this.state.loading);
        this.todoList.render(filteredTodos, this.state.loading);
        this.todoCount.render(filteredTodos.length);
    }
}
