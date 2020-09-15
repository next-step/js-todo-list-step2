import {Component} from "../../core/Component.js";

const template = (userName) => {
    return `<div><storng>${userName}</storng></div>
            <div>Todo LIST</div>
`;
}

export class UserTitle extends Component{
    constructor($target , event , props) {
        super($target,event , props);

        $target.addEventListener('click' , e=>{
            this.event.addUser('종완새이름');
        })
    }

}