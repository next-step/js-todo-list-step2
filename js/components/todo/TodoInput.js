import {Component} from "../../core/Component.js";

export class TodoInput extends Component{

    userId;
    constructor($target , event ,  props) {
        super($target ,  event , props);

        this.$target.addEventListener('keyup' , e=>{
            if(e.key==='Enter' && e.target.value !== ''){
                this.event.addTodo(this.userId, e.target.value);
                e.target.value =''
            }
        })

    }

    setUserId(userId) {
        this.userId = userId;
    }

}