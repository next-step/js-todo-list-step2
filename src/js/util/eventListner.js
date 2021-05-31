import  {$USER_DOM, $TODO_DOM} from './constants.js';
import userList from '../user/userList.js';
import todoApp from '../todo/initTodoClass.js';

const $buttons = document.querySelectorAll('.ripple');

$USER_DOM.createButton().addEventListener('click',  () => {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
    userList.add(userName);
});

$USER_DOM.deleteButton().addEventListener('click', () => {
    const { _id, name } = userList.getSelected();
    const isDel = confirm(`${name}을 삭제하시겠습니까?`);
    userList.del(isDel, _id);
});

$TODO_DOM.input().addEventListener('keydown', function() {
    if (window.event.keyCode == 13) {
        const { _id, name } = userList.getSelected();
        todoApp.add(_id, this.value);
        this.value = '';
    }
});

$TODO_DOM.todoList().addEventListener('dblclick', function(event) {
    const labelArea = event.target.closest('.label');
    const li = event.target.closest('li');
    if (!labelArea) return;

    const originalValue = labelArea.lastChild.textContent.trim();
    const { _id, name } = userList.getSelected();
    li.classList.add('editing');
    li.addEventListener('keyup', ({target, key}) => todoApp.edit({target, key}, _id, labelArea, originalValue))
});


$TODO_DOM.todoFilter().addEventListener('click', function(event) {
    const { _id, name } = userList.getSelected();
    const statusList = {
        all () {
            todoApp.allList(_id)
            return 0;
        },
        active () {
            todoApp.activeList(_id)
            return 1;
        },
        completed () {
            todoApp.completedList(_id)
            return 2;
        }
    }
    const index = statusList[event.target.classList[0]]();
    todoApp.initClassList(index);
})

$TODO_DOM.todoList().addEventListener('click', function(event) {
    const { _id, name } = userList.getSelected();
    const li = event.target.closest('li');
    const destroyButton = event.target.closest('.destroy');
    const toggleCheck = event.target.closest('.toggle');
    if (toggleCheck) {
        todoApp.changeTodoState(_id, li, toggleCheck);
    }
    if (destroyButton) {
        todoApp.destroy(_id, li);
    }
})

$TODO_DOM.clear().addEventListener('click', function(event) {
    const { _id, name } = userList.getSelected();
    todoApp.destroy(_id);
})

const initList = () => {
    userList.init();
}



export {initList}


