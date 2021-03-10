import UserList from './UserList.js'
import userApi from '../apis/userApi.js'
import TodoList from './TodoList.js'
import todoApi from '../apis/todoApi.js'
import TodoInput from './todoInput.js'

export default function TodoApp($el) {
  this.$el = $el
  this.components = {}
  this.state = {
    todoItems: [],
    users: [],
    activeUser: null,
    isLoading: true,
  }

  const fetchUsers = async () => {
    const users = await userApi.getUsers()
    this.setState({ users })
  }

  const changeUser = async (userId) => {
    const activeUser = this.state.users.find((user) => user._id === userId)
    this.setState({ activeUser })

    await fetchTodoItems(userId)
  }

  const createUser = async (userName) => {
    await userApi.createUser(userName)
    await fetchUsers()
  }

  const deleteUser = async (userId) => {
    await userApi.deleteUser(userId)
    await fetchUsers()
  }

  const fetchTodoItems = async (userId) => {
    this.setState({ isLoading: true })
    const todoItems = await todoApi.getTodoItems(userId)
    this.setState({ todoItems, isLoading: false })
  }

  const createTodoItem = async (contents) => {
    const userId = this.state.activeUser._id
    const addedTodoItem = await todoApi.createTodoItem(userId, contents)

    this.setState({
      todoItems: [...this.state.todoItems, addedTodoItem],
    })
  }

  const toggleTodoItem = async (todoItemId) => {
    const userId = this.state.activeUser._id
    const changedTodoItem = await todoApi.toggleTodoItem(userId, todoItemId)
    const changedTodoItemIndex = this.state.todoItems.findIndex(
      (todoItem) => todoItem._id === changedTodoItem._id
    )

    this.state.todoItems.splice(changedTodoItemIndex, 1, changedTodoItem)
    this.setState({
      todoItems: this.state.todoItems,
    })
  }

  const deleteTodoItem = async (todoItemId) => {
    const userId = this.state.activeUser._id
    await todoApi.deleteTodoItem(userId, todoItemId)
    await fetchTodoItems(userId)
  }

  const editTodoItemContents = async (todoItemId, contents) => {
    const userId = this.state.activeUser._id
    const editedTodoItem = await todoApi.editTodoItemContents(
      userId,
      todoItemId,
      contents
    )
    const editedTodoItemIndex = this.state.todoItems.findIndex(
      (todoItem) => todoItem._id === todoItemId
    )

    this.state.todoItems.splice(editedTodoItemIndex, 1, editedTodoItem)
    this.setState({
      todoItem: this.state.todoItems,
    })
  }

  const editTodoItemPriority = async (todoItemId, priority) => {
    const userId = this.state.activeUser._id
    const editedTodoItem = await todoApi.editTodoItemPriority(
      userId,
      todoItemId,
      priority
    )
    const editedTodoItemIndex = this.state.todoItems.findIndex(
      (todoItem) => todoItem._id === todoItemId
    )

    this.state.todoItems.splice(editedTodoItemIndex, 1, editedTodoItem)
    this.setState({
      todoItem: this.state.todoItems,
    })
  }

  this.setState = function (changeState) {
    this.state = {
      ...this.state,
      ...changeState,
    }

    const { todoItems, isLoading } = this.state
    this.components.todoList.setState({ todoItems, isLoading })

    this.render()
  }

  this.render = () => {
    const { name } = this.state.activeUser || { name: '' }

    this.$el.innerHTML = `
      <h1 id="user-title" data-username="${name}">
        <span><strong>${name}</strong>'s Todo List</span>
      </h1>
      <section>
        <div id="user-list"></div>
      </section>
    
      <section class="todoapp">
        <div id="todo-input"></div>
        <div id="todo-list"></div> 
        <div class="count-container">
          <span class="todo-count">총 <strong>0</strong> 개</span>
          <ul class="filters">
            <li>
              <a href="/#" class="all selected" >전체보기</a>
            </li>
            <li>
              <a href="#active" class="active">해야할 일</a>
            </li>
            <li>
              <a href="#completed" class="completed">완료한 일</a>
            </li>
          </ul>
          <button class="clear-completed">모두 삭제</button>
        </div>
      </section>
        `

    this.components = {
      userList: new UserList(
        this.$el.querySelector('#user-list'),
        {
          users: this.state.users,
          activeUser: this.state.activeUser,
        },
        {
          changeUser,
          createUser,
          deleteUser,
        }
      ),

      todoList: new TodoList(
        this.$el.querySelector('#todo-list'),
        {
          todoItems: this.state.todoItems,
          isLoading: this.state.isLoading,
        },
        {
          toggleTodoItem,
          deleteTodoItem,
          editTodoItemContents,
          editTodoItemPriority,
        }
      ),

      todoInput: new TodoInput(
        this.$el.querySelector('#todo-input'),
        {},
        {
          createTodoItem,
        }
      ),
    }
  }

  this.initailize = async function () {
    this.render()

    await fetchUsers()
    await changeUser(this.state.users[0]._id)
  }

  this.initailize()
}
