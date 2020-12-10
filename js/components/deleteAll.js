import Component from '../lib/component.js';
import store from '../store/index.js';

const DeleteAll = class extends Component {
    constructor() {
    super({
        store,
        element: document.querySelector('.clear-completed')
    });
    }
    
    deleteAll = () => {
        store.dispatch('deleteAllToDo');
    }
    
    setEvent(target){
        target.addEventListener('click', () => {
            this.deleteAll();
        });
    }
}
export default DeleteAll;
