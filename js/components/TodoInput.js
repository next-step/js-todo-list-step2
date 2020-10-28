import { Observer } from "../observer/Observer.js";

export const TodoInput = class extends Observer{

    setEvent(){
        this._target.addEventListener('keyup', ({ target, key }) => {
            if (key === 'Enter' && target.value !=="") {
                this._service.addItem(target.value.toString());
                target.value = "";
            }
        });
    }
    render(){

    }
    /*template= () =>{
        return `<input class="new-todo" placeholder="할 일을 입력해주세요." autofocus />`;
    }*/
}

