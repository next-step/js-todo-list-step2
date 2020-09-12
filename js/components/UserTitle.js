import { Observer } from "../observer/Observer.js";
import { templates } from "../data/templates.js";

export const UserTitle = class extends Observer {

    setState() {
        super.setState({name: this._service.getSelectedUser().name});
    }

    render() {
        const { name } = this._state;
        this._target.innerHTML = templates.userTitle(name);
    }
}

