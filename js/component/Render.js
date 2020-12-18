import UserComponent from "./User.js";

export default class Render {
    $userCreateButton = null;
    $userList = null;
    $todoInput = null;
    $todoList = null;
    $todoItems = null;
    $todoCount = null;
    user = null;
    createUser = null;
    getTodoItems = null;
    createTodoItem = null;
    updateCompleted = null;
    updateTodoItem = null;
    selectedUserId = null;
    deleteTodoItem = null;
    constructor({
        createUser,
        getTodoItems,
        createTodoItem, 
        updateCompleted,
        updateTodoItem,
        deleteTodoItem}) {
        this.createUser = createUser;
        this.getTodoItems = getTodoItems;
        this.updateCompleted = updateCompleted;
        this.updateTodoItem = updateTodoItem;
        this.$userCreateButton = document.querySelector('.user-create-button');
        this.$userCreateButton.addEventListener('click', this.onCreateUserHandler)
        this.$userList = document.querySelector('#user-list');
        this.$todoInput = document.querySelector(".new-todo");
        this.$todoInput.addEventListener('keyup', this.onCreateTodoHandler)
        this.$todoList = document.querySelector(".todo-list");
        this.$todoItems = document.querySelectorAll(".todo-list li");
        this.$todoCount = document.querySelector(".todo-count strong");
        this.createTodoItem = createTodoItem;
        this.deleteTodoItem = deleteTodoItem;
        this.selectedUserId = "";
    }

    onCreateUserHandler = () => {
        let userName = prompt("추가하고 싶은 이름을 입력해주세요.");
   
        if(userName.length >= 2) {
           this.createUser(userName);
        } else {
           alert("이름은 최소 2글자 이상이어야합니다.");
       }
    }

    onCreateTodoHandler = (event) => {
        if(event.key === "Enter") {
            if(this.selectedUserId === "") {
                alert("User를 선택해주세요.")
            } else if(this.$todoInput.value.length > 0) {
                this.createTodoItem({
                    userId: this.selectedUserId,
                    contents: this.$todoInput.value
                });
                this.$todoInput.value = "";
            } else {
                alert("할 일을 입력해주세요.");
            }
        }
    }

    onCreateUser(userData) {
        let appendData = document.createElement("button");
        let appendText = document.createTextNode(userData.name);

        appendData.appendChild(appendText);
        appendData.setAttribute('id', userData._id);
        appendData.setAttribute("class", "ripple");
        
        this.$userList.prepend(appendData);
        appendData.addEventListener('click', (e) => this.onUserClick(e));
    }

    onUserClick(event) {
        this.selectedUserId = event.target.getAttribute('id');
        event.target.setAttribute("class", "ripple active");
        this.getTodoItems(this.selectedUserId);
    }

    onToggleClick(event) {
        let item = {
            userId: this.selectedUserId,
            id: event.target.offsetParent.getAttribute('id')
        }

        this.updateCompleted(item);
    }

    onCreateItem(item) {
        this.$todoList.append(this.getItemHtml(item));
        this.$todoItems = document.querySelectorAll(".todo-list li");
        this.setTotoCount(this.$todoItems.length);
    }

    onEditTodoItem(event) {
        let itemId = event.target.offsetParent.getAttribute("id");

        event.target.offsetParent.setAttribute("class", "editing");
    }

    onUpdateItem(event) {
        this.$todoItems = document.querySelectorAll(".todo-list li");
        this.$todoItems.forEach(item => {
            if(item.getAttribute("id") === event._id) {
                item.contents = event.contents;
            }
        })
    }

    onKeyup(event) {
        if(event.key === "Enter") {
            this.updateTodoItem({
                userId: this.selectedUserId,
                itemId: event.target.offsetParent.getAttribute("id"),
                contents: event.target.value
            });
            event.target.offsetParent.setAttribute("class", "");
        } else if(event.key === "Escape") {
            event.target.offsetParent.setAttribute("class", "");
        }
    }

    setTodoItems(items) {
        this.$todoList.innerHTML = "";

        items.forEach(item => {
            this.$todoList.append(this.getItemHtml(item));
        });

        this.$todoItems = document.querySelectorAll(".todo-list li");
        this.setTotoCount(this.$todoItems.length);
    }

    getItemHtml(item) {
        let itemHtml = document.createElement("li");
        let viewData = document.createElement("div");
        let toggleData = document.createElement("input");
        let labelData = document.createElement("label");
        let selectData = document.createElement("select");
        let optionData = null;
        let appendText = null;
        let buttonData = document.createElement("button");
        let editData = document.createElement("input");

        itemHtml = document.createElement("li");
        viewData = document.createElement("div");
        toggleData = document.createElement("input");
        labelData = document.createElement("label");
        selectData = document.createElement("select");
        optionData = null;
        buttonData = document.createElement("button");
        editData = document.createElement("input");

        itemHtml.setAttribute("id", item._id);
        viewData.setAttribute("class", "view");
        toggleData.setAttribute("class", "toggle");
        toggleData.setAttribute("type", "checkbox");
        labelData.setAttribute("class", "label");
        selectData.setAttribute("class", "chip select");

        toggleData.addEventListener('click', (e) => this.onToggleClick(e));
        labelData.addEventListener('dblclick', (e) => this.onEditTodoItem(e));
        buttonData.addEventListener('click', (e) => this.onDeleteClick(e));
        editData.addEventListener('keyup', (e) => this.onKeyup(e));
        for(let i=0;i<3;i++) {
            appendText = document.createTextNode(i === 0 ? "순위" : `${i}순위`);
            optionData = document.createElement("option");
            optionData.setAttribute("value", i);
            optionData.appendChild(appendText);
            selectData.append(optionData);
        }
        appendText = document.createTextNode(item.contents);
        buttonData.setAttribute("class", "destroy");
        editData.setAttribute("class", "edit");
        editData.setAttribute("value", item.contents);
        labelData.innerHTML = item.contents;
        labelData.prepend(selectData);
        viewData.append(toggleData);
        viewData.append(labelData);
        viewData.append(buttonData);
        itemHtml.append(viewData);
        itemHtml.append(editData);

        return itemHtml;
    }

    onDeleteClick(event) {
        this.deleteTodoItem({
            userId: this.selectedUserId,
            itemId: event.target.offsetParent.getAttribute('id')}
            );
    }

    createLoadingHtml() {
        let itemHtml = document.createElement("li");
        let viewData = document.createElement("div");
        let labelData = document.createElement("label");
        let animatedlData = document.createElement("div");
        let containerData = document.createElement("div");
        let maskData = document.createElement("div");

        itemHtml.setAttribute("id", "loading");
        viewData.setAttribute("class", "view");
        labelData.setAttribute("class", "label");
        animatedlData.setAttribute("class", "animated-background");
        containerData.setAttribute("class", "skel-mask-container");
        maskData.setAttribute("class", "skel-mask");

        containerData.append(maskData);
        animatedlData.append(containerData);
        labelData.append(animatedlData);
        viewData.append(labelData);
        itemHtml.append(viewData);

        this.$todoList.prepend(itemHtml);
    }

    removeLoadingHtml() {
        let loading = document.querySelector("#loading");

        loading.remove();
    }

    setTotoCount(count) {
        this.$todoCount.innerHTML = count;
    }


}