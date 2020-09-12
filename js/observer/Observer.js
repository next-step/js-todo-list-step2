export const Observer = class {
    _target; _state = {}; _service;
    constructor(target, subject) {
        this._target = target;
        this._service = subject.getService();
        this.setEvent();
    }
    getState(){
        return this._state;
    }
    getTarget(){
        return this._target;
    }

    setEvent() {

    }

    setState(state) {
        this._state = {...this._state, ...state};
        this.render();
    }
    render(){

    }

    render(subject) {
    }
};
