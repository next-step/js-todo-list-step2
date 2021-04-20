const $USER_DOM = {
    title() {
        return document.getElementById('user-title');
    },
    
    list() {
        return document.querySelector('#user-list');
    },

    createButton() {
        return this.list().querySelector('.user-create-button');
    },

    deleteButton() {
        return this.list().querySelector('.user-delete-button');
    },
}

const $TODO_DOM = {
    initItems() {
       const li = document.querySelectorAll('.todo-list > li');
       li.forEach(function(node) {
            node.parentNode.removeChild(node); 
       });
    }
    
}


export {$USER_DOM, $TODO_DOM}