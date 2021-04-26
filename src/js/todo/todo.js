import $api from '../api.js';
import  {$USER_DOM, $TODO_DOM} from '../util/constants.js';
export default class Todo {
    constructor() {
        this._todoListKey = "todo";
        this._todoItems = [];
        this._id = 0;
        this._todoInput = document.getElementsByClassName('new-todo');
        this._todoList = document.querySelector('.todo-list');
        this._todoFilter = document.querySelector('.filters');
        this._todoCount = document.querySelector('.todo-count').firstElementChild;
        //this.loadTodos();
    }

    async loadById(_id) {
        const loadItems = await this.loadTodoItems(_id);
        const todoApp = this;
        $TODO_DOM.initItems();
        loadItems.forEach(function(todo){
            todoApp.printTodos(todo);
        });
        this.initClassList(0);
        return loadItems;
    }

    async loadTodoItems(_id) {
        return await $api.user.loadTodoItem(_id);
    }

    async add(_id, todo) {
        if (this.checkNull(todo)) {
            return alert('빈 값을 입력할 수 없습니다.');
        };
        const todoObj = {
            contents : todo
        }
        const createTodo = await $api.user.addTodoItem(_id, todoObj);
        this.loadById(_id);
    }

    destroy(target, li) {
        target.removeChild(li);
        this._todoCount.innerText = this.todoCount;
        this.deleteItems(li);
    }

    edit({target, key}, userId, labelArea, originalValue) {
        const todoApp = this;
        const editType = {
            async Enter () {
                labelArea.lastChild.textContent = target.value;
                target.closest('li').classList.remove('editing');
                const itemId = target.closest('li').id;
                const itemObj = {
                    contents : target.value
                }
                const editTodo = await $api.user.editTodoItem(userId, itemId, itemObj);
                this.loadById(userId);
            },

            Escape () {
                target.value = originalValue;
                target.closest('li').classList.remove('editing');
            }
        }
        if (!editType[key]) {
            return;
        }
        editType[key]();
    }

    printTodos(todoObj) {
        const checked = todoObj.isCompleted == true ? 'checked' : '';
        const completed = todoObj.isCompleted == true ? 'completed' : ''; 
        this._todoLi = document.createElement('li');
        this._todoLi.id = todoObj._id;
        this._todoLi.className = completed;
        this._todoLi.innerHTML = `
                <div class='view'>
                    <input class="toggle" type="checkbox" ${checked}>
                    <label class="label">
                    <select class="chip select">
                        <option value="0" selected>순위</option>
                        <option value="1">1순위</option>
                        <option value="2">2순위</option>
                    </select>
                    ${todoObj.contents}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value=${todoObj.contents}> 
        `;
        this._todoList.append(this._todoLi);
    }

    async changeTodoState(_id, li, toggleCheck) {
        const toggleItem = await $api.user.toggleTodoItem(_id, li);
        if (li.className == '') {
            li.classList.add('completed');
            toggleCheck.setAttribute('checked', '');
            //this.updateItems(li);
            return;
        } 
        li.removeAttribute('class');
        toggleCheck.removeAttribute('checked');
        //this.updateItems(li);
    }
    
    // updateItems(li) {
    //     this._todoItems.filter(todo => todo.id == parseInt(li.id))
    //                    .map(todo => {
    //         todo.class = li.className;
    //         todo.checked = li.classList.contains('completed')? 'true' : 'false';
    //     });
    //     this.saveLocalStorage();
    // }

    deleteItems(li) {
        const filterdItems = this._todoItems.filter(function (todo) {
            return todo.id != parseInt(li.id);
        });
        this._todoItems = filterdItems;
        this.saveLocalStorage();
    }

    initTodoList() {
         while (this._todoList.firstChild) {
             this._todoList.removeChild(this._todoList.firstChild);
         }
    }

    async allList(_id) {
        const loadItems = await this.loadById(_id);
        this._todoCount.innerText = loadItems.length;
    }

    async activeList(_id) {
        this.initTodoList();
        const todoApp = this;
        const allTodos = await todoApp.loadTodoItems(_id);
        const filterd = allTodos.filter(todo => todo.isCompleted != true)
                   .map(todo => todoApp.printTodos(todo));
        this._todoCount.innerText = filterd.length;
    }

    async completedList(_id) {
        this.initTodoList();
        const todoApp = this;
        const allTodos = await todoApp.loadTodoItems(_id);
        const filterd = allTodos.filter(todo => todo.isCompleted == true)
                   .map(todo => todoApp.printTodos(todo));
        this._todoCount.innerText = filterd.length;
    }
    
    getLocalStorage() {
        const loadedTodos = localStorage.getItem(this._todoListKey);
        if (!loadedTodos) return [];
        const paredTodos = JSON.parse(loadedTodos);
        return paredTodos;
    }

    saveLocalStorage() {
        localStorage.setItem(this._todoListKey, JSON.stringify(this._todoItems))
    }

    checkNull(todo) {
        if (todo.trim() == '') {
            return true;
        }
        return false;
    }

    initClassList = (index) => {
        for (let item of this._todoFilter.children) {
            item.children[0].classList.remove('selected');
        }
        this._todoFilter.children[index].children[0].classList.add('selected');
    }

    get todoCount() {
        return this._todoList.childNodes.length;
    }

    get todoInput() {
        return this._todoInput;
    }

    get todoList() {
        return this._todoList;
    }

    get todoFilter() {
        return this._todoFilter;
    }
}