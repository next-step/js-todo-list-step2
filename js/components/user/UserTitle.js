import {Component} from "../../core/Component.js";

const template = (userName) => {
    return `<div><storng>${userName}</storng></div>
            <div>Todo LIST</div>
`;
}

export class UserTitle extends Component{
    constructor($target , props) {
        super($target, props);
    }

}