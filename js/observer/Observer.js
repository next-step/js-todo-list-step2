export const Observer = class {
    _target; _state = {}; _service;
    constructor(target, subject) {
        this._target = target;
        this._service = subject.service;
        this.setEvent();
    }
    get state(){
        return this._state;
    }
    get target(){
        return this._target;
    }

    setEvent() {

    }

    setState(state) {
        this._state = {...this._state, ...state};
        this.render();
    }

    render(){
        this._target.innerHTML = this.template();
    }
};
