import { API } from './API.js';
import { userTemplate, itemTemplate } from './template.js';

let currentUser = '';
let currentUserID = '';
let users = [];
let todoList = [];
let todoFilter = 'all';

const userCreateButton = document.querySelector('.user-create-button');
const $todoList = document.querySelector('ul.todo-list');
const $userList = document.querySelector('div#user-list');
let currentUserButton = $userList.querySelectorAll('button.ripple')[0];

const $newTodo = document.querySelector('input.new-todo');

userCreateButton.addEventListener('click', () => onUserCreateHandler());
$userList.addEventListener('click', event => {
  $userList.querySelectorAll('button.ripple').forEach(($user, index) => {
    if($user.contains(event.target) && !$user.classList.contains('user-create-button')){
      onUserSelectHandler($user, index);
      // onUserDeleteHandler($user, index)
    }
  });
})

$todoList.addEventListener('click', event => {
  $todoList.querySelectorAll('input.toggle').forEach(($item, index) => {
    if($item.contains(event.target)){
      toggleTodo($item, index);
    }
  })
  $todoList.querySelectorAll('button.destroy').forEach(($item, index) => {
    if($item.contains(event.target)){
      deleteTodo($item, index);
    }
  });
})

$todoList.addEventListener('dblclick', event => {
  $todoList.querySelectorAll('label.label').forEach(($item, index) => {
    if($item.contains(event.target)){
      const itemElement = $item.parentNode.parentNode;
      itemElement.classList.add('editing');
    }
  });
})

$newTodo.addEventListener('keyup', event => {
  if(event.key === 'Enter'){
    addTodo($newTodo.value);
  }
})

$todoList.addEventListener('keyup', event => {
  if(event.key === 'Enter'){
    $todoList.querySelectorAll('input.edit').forEach(($item, index) => {
      const itemElement = $item.parentNode;
      if(itemElement.classList.contains('editing')){
        modifyTodo($item, index);
      }
    })
  }
});

window.onload = () => {
  loadUserList();
}

const loadUserList = () => {
  API.fetchUserList()
    .then(response => response.json())
    .then(data => {
      users = data;
      init();
    })
    .catch(err => console.error(err));
}

const init = () => {
  renderUsers();
  currentUserButton = $userList.querySelectorAll('button.ripple')[0];
  onUserSelectHandler(currentUserButton, 0);
  render();
}

const renderUsers = () => {
  users.forEach(user => addUser(user));

  const currentUserButton = document.querySelector('button.ripple.active');
  if(currentUserButton){
    currentUser = currentUserButton.innerText;
  }
  else{
    currentUser = document.querySelector('button.ripple');
    currentUser.classList.add('active');
  }
}

const onUserCreateHandler = () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  if(userName.length < 2){
    alert("User의 이름은 최소 2글자 이상이어야 합니다.");
    return;
  }
  currentUserButton = document.querySelector('button.ripple.active');

  const newUser = userTemplate;
  newUser.name = userName;
  newUser.todoList = [];
  newUser._id = Math.random().toString(36).substr(2,10);
  users.push(newUser);
  addUser(newUser);
  API.addUser(newUser);

  if(currentUserButton){
    currentUser = currentUserButton.innerText;
  }
  else{
    currentUser = document.querySelector('button.ripple');
    currentUser.classList.add('active');
  }
}

const addUser = user => {
  const newUserButton = document.createElement('button');
  newUserButton.classList.add('ripple');
  newUserButton.innerText = user.name;
  userCreateButton.insertAdjacentElement('beforebegin', newUserButton);
}

const onUserDeleteHandler = ($user, index) => {
  currentUserID = users[index]._id;

  API.deleteUser(currentUserID)
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })

  render();
}

const onUserSelectHandler = ($user, index) => {
  const currentUserButton = document.querySelector('button.ripple.active');
  if(currentUserButton) currentUserButton.classList.remove('active');
  $user.classList.add('active');

  currentUserID = users[index]._id;

  API.fetchTodoList(currentUserID)
    .then(response => response.json())
    .then(data => {
      todoList = data;
      console.log(todoList)
      render();
    })
    .catch(err => console.error(err))

}

const toggleTodo = ($item, index) => {
  const todoItem = todoList[index];
  todoItem.isCompleted = !todoItem.isCompleted;
  todoList[index] = todoItem;

  API.toggleTodo(currentUserID, todoItem._id)
    .then(response => {
      render();
    });
}

const render = () => {
  const $todoList = document.querySelector('ul.todo-list');

  const todos = filterList();
  const renderList = todos.map(($item, index) => {
    return todoTemplate($item);
  })
  $todoList.innerHTML = renderList.join(' ');
}

const addTodo = todoItem => {
  const newItem = itemTemplate;
  newItem._id = Math.random().toString(36).substr(2,10);
  newItem.contents = todoItem;
  
  todoList.push(newItem);

  render();

  API.addTodo(currentUserID, newItem)
    .catch(err => console.error(err));
}

const deleteTodo = ($item, index) => {
  const todoItem = todoList[index];
  todoList.splice(index, 1);
  
  API.deleteTodo(currentUserID, todoItem._id)
    .then(response => {
      render();
    });
}

const modifyTodo = ($item, index) => {
  const itemElement = $item.parentNode;
  itemElement.classList.remove('editing');
  
  const todoItem = todoList[index];
  todoItem.contents = $item.value;
  render();

  API.updateTodo(currentUserID, todoItem)
    .catch(err => console.error(err));
}

const filterList = () => {
  if(todoFilter === 'all') {
    return todoList;
  }
  if(todoFilter === 'active'){
    return todoList.filter(($item) => !$item.isCompleted);
  }
  if(todoFilter === 'completed'){
    return todoList.filter(($item) => $item.isCompleted);
  }
}

const todoTemplate = todoItem => `
        <li class=${(todoItem.isCompleted) ? "completed" : ""}>
          <div class="view">
            <input class="toggle" type="checkbox" ${(todoItem.isCompleted) ? 'checked' : ''}/>
            <label class="label">
              <select class="chip select">
                <option value="0" selected>순위</option>
                <option value="1">1순위</option>
                <option value="2">2순위</option>
              </select>
              ${todoItem.contents}
            </label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value=${todoItem.contents} />
        </li>
`;