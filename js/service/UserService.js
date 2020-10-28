/**
 * 1. 유저생성 메서드 = addUser
 * 2. 유저삭제 메서드 = deleteUser
 * 3. 유저의 todoList 불러오기 메서드= getTodoList
 * 4. 유저의 todoList에 todoItem 추가하기= addItem
 * 5. 유저의 todoList에 todoItem 삭제하기= deleteItem
 * 6. 유저의 todoList에 todoItem 수정하기(완료|수정|우선순위)= updateItem
 *
 */
import { FooterTab, Priorities } from "../data/constant.js";


export const UserService = class {
    #todoHttpClient;
    #userList;
    #selectedUser;
    #subject
    #filterTab=FooterTab.ALL;
    #filteredTodoList = []


    constructor(httpClient, subject) {
        if (httpClient) {
            this.#todoHttpClient = httpClient;
        }
        this.#subject = subject;
    }

    setup = async () => {
        await this.updateUserList();
    }

    currentFilterTab = () => this.#filterTab;
    currentFilteredTodoList = () => this.#filteredTodoList;

    #filtering(){
        const condition = this.#filterTab === "active"
            ? (item)=>item.isCompleted === false
            : this.#filterTab === "completed"
                ? (item)=>item.isCompleted === true
                : ()=>true;
        this.#filteredTodoList = this.#selectedUser.todoList.filter(condition);

    }

    switchTap(type) {
        if (this.#filterTab !== type) {
            this.#filterTab = type;
            this.#filtering();
            this.#subject.notify();
        }
    }

    updateUserList = async () => {
        this.#userList = await this.#todoHttpClient.findUsers();
        if (this.#userList.length > 0) {
            this.changeSelectedUser(this.#userList[0]);
        }
    }

    changeSelectedUser = (user) => {
        this.#selectedUser = user;
        this.#filtering();
        this.#subject.notify();
    }
    changeSelectedUserById = (userId) => {
        const findUser = this.#userList.find(user => user._id === userId);
        if (findUser)
            this.changeSelectedUser(findUser);
    }

    getSelectedUser = () => {
        return this.#selectedUser;
    }

    getUserList = () => {
        return this.#userList;
    }

    addUser = async (name) => {
        const savedUser = await this.#todoHttpClient.saveUser(name);
        this.#userList.push(savedUser);
        this.#selectedUser = savedUser;
        this.#subject.notify();
    };
    deleteUser = async (userId) => {
        return this.#todoHttpClient.deleteUser(userId);
    }
    getTodoList = async (userId) => {
    }

    addItem = async (contents) => {
        const todoItem = await this.#todoHttpClient.saveTodoItem(this.#selectedUser._id, contents);
        this.#selectedUser.todoList.push(todoItem);
        this.#filtering();
        this.#subject.notify();
    }
    deleteItem = async (itemId) => {
        const todoList = this.#selectedUser.todoList;
        const findIndex = todoList.findIndex(item => item._id === itemId);
        if (findIndex < 0) return;
        todoList.splice(findIndex, 1);
        await this.#todoHttpClient.deleteTodoItem(this.#selectedUser._id, itemId);
        this.#filtering();
        this.#subject.notify();
    }

    deleteItems = async () =>{
        const { _id } = this.#selectedUser;
        await this.#todoHttpClient.deleteTodoItemsAll(_id);
        this.#selectedUser.todoList = [];
        this.#filtering();
        this.#subject.notify();
    }

    updateItem = async (itemId, contents) => {
        const findItem = this.findTodoItem(itemId);
        findItem.contents = contents;
        await this.#todoHttpClient.modifyTodoItem(this.#selectedUser._id, itemId, contents);
        this.#subject.notify();
    };

    toggleItem = async (itemId) => {
        const { _id, todoList } = this.#selectedUser;
        const findItem = todoList.find(item => item._id === itemId);
        findItem.isCompleted = !findItem.isCompleted;
        await this.#todoHttpClient.modifyTodoItemComplete(_id, itemId, findItem.isCompleted);
        this.#filtering();
        this.#subject.notify();
    }

    updateItemPriority = async (itemId, priority) => {
        const decodedPriority = this.#decodePriority(priority);
        const findItem = this.findTodoItem(itemId);
        if (findItem.priority === decodedPriority) return;
        findItem.priority = decodedPriority;
        await this.#todoHttpClient.modifyTodoItemPriority(this.#selectedUser._id, itemId, decodedPriority);
        this.#filtering();
        this.#subject.notify();
    }

    findTodoItem = (itemId) => {
        const todoList = this.#selectedUser.todoList;
        return todoList.find(item => item._id === itemId);
    };

    #decodePriority(priority) {
        return priority === "0"
            ? Priorities.NONE : priority === "1"
                ? Priorities.FIRST : Priorities.SECOND
    }

}
