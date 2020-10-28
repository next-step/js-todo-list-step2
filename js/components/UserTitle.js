import { Observer } from "../observer/Observer.js";

export const UserTitle = class extends Observer {

    setState() {
        super.setState({name: this._service.getSelectedUser().name});
    }

    template() {
        const { name } = this._state;
        return `<span><strong>${name}</strong>'s Todo List</span>`;
    }
}

