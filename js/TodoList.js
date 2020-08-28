import { KEY, ADDRESS } from './constants.js'

export default function TodoList ($todoList, userName) {
  this.$todoList = $todoList
  this.userName = userName
  this.data = []

  this.editItem = (index, text) => {
    this.data[index].text = text
    this.render()
    this.bindEvents()
  }

  this.setState = (activeUserName) => {
    this.userName = activeUserName
    this.getTodoItems()
  }

  this.bindEvents = () => {
    document.querySelectorAll('.todo-item').forEach(($item) => {
      $item.querySelector('input.toggle').addEventListener('click', (e) => {
        e.stopPropagation()
        const $todoItem = e.target.closest('.todo-item')
        const { index } = $todoItem.dataset

        if ($todoItem.classList.contains('completed')) {
          $todoItem.classList.remove('completed')
          this.data[index].isCompleted = false
          
        } else {
          $todoItem.classList.add('completed')
          this.data[index].isCompleted = true
        }
        this.toggle($todoItem.id)
      })

      $item.querySelector('button.destroy').addEventListener('click', (e) => {
        e.stopPropagation()
        const _id = e.target.closest('.todo-item').id
        this.delete(_id)
      })

      $item.querySelector('label').addEventListener('dblclick', (e) => {
        e.stopPropagation()
        const $todoItem = e.target.closest('.todo-item')
        const { index } = e.target.closest('.todo-item').dataset
        const oldValue = e.target.innerText

        $todoItem.classList.add('editing')
        $todoItem.addEventListener('keyup', (e) => {
          if (e.key === KEY.ESC) {
            $todoItem.classList.remove('editing')
            e.target.value = oldValue
          } else if (e.key === KEY.ENTER) {
            this.editItem(index, e.target.value)

            this.edit($todoItem.id, e.target.value)
          }
        })
      })
    })
  }

  this.getTodoItems = () => {
    fetch(`${ADDRESS.BASE_URL}/api/u/${this.userName}/item`)
      .then((response) => response.json())
      .then((data) => {
        this.data = data.todoList

        this.render()
        this.bindEvents()
      })
  }

  this.post = (text) => {
    fetch(`${ADDRESS.BASE_URL}/api/u/${this.userName}/item/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: text
      })
    }).then(() => this.getTodoItems())
  }

  this.delete = (_id) => {
    fetch(`${ADDRESS.BASE_URL}/api/u/${this.userName}/item/${_id}`, {
      method: 'DELETE'
    }).then(() => this.getTodoItems())
  }

  this.toggle = (_id) => {
    fetch(`${ADDRESS.BASE_URL}/api/u/${this.userName}/item/${_id}/toggle`, {
      method: 'PUT'
    })
  }

  this.edit = (_id, text) => {
    fetch(`${ADDRESS.BASE_URL}/api/u/${this.userName}/item/${_id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: text
      })
    }).then(() => this.getTodoItems())
  }

  this.render = () => {
    let result = ''

    if (this.data) {
      this.data.map(({ _id, contents, isCompleted, priority }, index) => {
        result += `<li class="todo-item ${isCompleted ? 'completed' : ''}" data-index="${index}" id="${_id}">
          <div class="view">
          <input class="toggle" type="checkbox" ${isCompleted ? 'checked' : ''} />
          <label class="label">
          <select class="chip select">
            <option value="0" ${priority == 0 ? 'selected' : ''}>순위</option>
            <option value="1" ${priority == 1 ? 'selected' : ''}>1순위</option>
            <option value="2" ${priority == 2 ? 'selected' : ''}>2순위</option>
          </select>
          ${contents}</label>
          <button class="destroy"></button>
          </div>
          <input class="edit" value="${contents}" />
          </li>`
      }).join('')
    }

    this.$todoList.innerHTML = result
  }

  this.getTodoItems()
}
