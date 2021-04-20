import  {$USER_DOM, $TODO_DOM} from './constants.js';
import userList from '../user/userList.js';

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


// todoApp.todoInput.addEventListener('keydown', function() {
//     if (window.event.keyCode == 13) {
//         todoApp.add(this.value);
//         this.value = '';
//     }
// })

// todoApp.todoList.addEventListener('click', function(event) {
//     const toggleCheck = event.target.closest('.toggle');
//     const destroyButton = event.target.closest('.destroy');
//     const li = event.target.closest('li');
//         if (toggleCheck) {
//             todoApp.changeTodoState(li, toggleCheck);
//         }
//         if (destroyButton) {
//             todoApp.destroy(this, li);
//         }
// })

// todoApp.todoList.addEventListener('dblclick', function(event) {
//     const labelArea = event.target.closest('.label');
//     const li = event.target.closest('li');
//     if (!labelArea) return;

//     const originalValue = labelArea.innerText;
//     li.classList.add('editing');
//     li.addEventListener('keyup', ({target, key}) => todoApp.edit({target, key},labelArea, originalValue))
// })

// todoApp.todoFilter.addEventListener('click', function(event) {
//     const statusList = {
//         all () {
//             todoApp.allList()
//         },
//         active () {
//             todoApp.activeList()
//         },
//         completed () {
//             todoApp.completedList()
//         }
//     }
//     statusList[event.target.id]();
//     initClassList(event, this);
// })

// const initClassList = (event, target) => {
//     for (let item of target.children) {
//         item.children[0].classList.remove('selected');
//     }
//     event.target.classList.add('selected');
// }


const initList = () => {
    userList.init();
}



export {initList}


