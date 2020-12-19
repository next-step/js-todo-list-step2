import RenderComponent from "./Render.js";
import UserComponent from "./User.js";
import ServerComponent from "./Server.js";

export default class App {
    render = null;
    user = null;
    server = null;

    constructor() {
        this.render = new RenderComponent({
            createUser: (value => {
                this.onCreateUser(value);
            }),
            getTodoItems: (value => {
                this.getTodoItems(value);
            }),
            createTodoItem: (value => {
                this.onCreateTodoItem(value);
            }),
            updateCompleted: (value => {
                this.onUpdateCompleted(value);
            }),
            updateTodoItem: (value => {
                this.onUpDateTodoItem(value);
            }),
            deleteTodoItem: (value => {
                this.onDeleteTodoItem(value);
            })
        });
        this.user = new UserComponent([]);
        this.server = new ServerComponent();
    }

    onCreateUser(userName) {
        let resData = this.server.createUser(userName);

        resData.then(res => {
            if(!res.ok) {
                throw new Error();
            } else {
                return res.json();
            }            
        }).then(data => {
            this.render.onCreateUser(data);
        }).catch(error => {
        })
    }

    getTodoItems(value) {
        let resData = this.server.getTodoItems(value);
        
        this.render.createLoadingHtml();
        resData.then(res => {
            if(!res.ok) {
                throw new Error();
            } else {
                return res.json();
            }            
        }).then(data => {
            this.render.setTodoItems(data);
            this.render.removeLoadingHtml();
        }).catch(error => {
        })
    }

    onCreateTodoItem(value) {
        let resData = this.server.createTodoItem(value.userId, value.contents);
       
        this.render.createLoadingHtml();
        resData.then(res => {
            if(!res.ok) {
                throw new Error();
            } else {
                return res.json();
            }            
        }).then(data => {
            this.render.onCreateItem(data);
            this.onSelectItems(value.userId);
            this.render.removeLoadingHtml();
        }).catch(error => {
        })
    }

    onSelectItems(userId) {
        let resData = this.server.selectItems(userId);
        resData.then(res => {
            if(!res.ok) {
                throw new Error();
            } else {
                return res.json();
            }            
        }).then(data => {
        }).catch(error => {
        })
    }

    onUpdateCompleted(value) {
        let resData = this.server.updateCompleted(value.userId, value.id);

        resData.then(res => {
            if(!res.ok) {
                throw new Error();
            } else {
                return res.json();
            }            
        }).then(data => {
        }).catch(error => {
        })
    }

    onUpDateTodoItem(value) {
        let resData = this.server.updateTodoItem(value.userId, value.itemId, value.contents);

        this.render.createLoadingHtml();
        resData.then(res => {
            if(!res.ok) {
                throw new Error();
            } else {
                return res.json();
            }            
        }).then(data => {
            this.render.onUpdateItem(data);
            this.render.removeLoadingHtml();
        }).catch(error => {
        })
    }

    onDeleteTodoItem(value) {
        let resData = this.server.deleteTodoItem(value.userId, value.itemId);
        
        this.render.createLoadingHtml();
        resData.then(res => {
            if(!res.ok) {
                throw new Error();
            } else {
                return res.json();
            }            
        }).then(data => {
            this.render.setTodoItems(data.todoList);
            this.render.removeLoadingHtml();
        }).catch(error => {
        })
    }
}