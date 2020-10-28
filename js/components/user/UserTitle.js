import {Component} from "../../core/Component.js";

export class UserTitle extends Component{

     template = (userName) => {
        return `<span><strong>${userName}</strong>'s Todo List</span>
`;
    }

    username = '';
    constructor($target , event , props) {
        super($target,event , props);



    }

    setUsername(username){
        this.username = username;
        this.render();
    }

    render(){
        this.$target.innerHTML = this.template(this.username);
    }
}