import {Component} from "../../core/Component.js";

const template = (userName) => {
    return `<span><strong>${userName}</strong>'s Todo List</span>
`;
}

export class UserTitle extends Component{
    username = '';
    constructor($target , event , props) {
        super($target,event , props);



    }

    setUsername(username){
        this.username = username;
        this.render();
    }

    render(){
        this.$target.innerHTML = template(this.username);
    }
}