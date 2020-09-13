import { Observer } from "../observer/Observer.js";

export const TodoFooter = class extends Observer{

    setEvent(){
        /**
         * 1. 탭스위칭
         * 2. 모두 삭제
         */
        this._target.addEventListener('click', ({ target }) => {
            if (target && target.tagName === "A") {

            }
        });
    }

    setState(){
        /*super.setState({
            count:this._service.getTodoListCount(), type:
        })*/
    }
    render(){

    }
}
