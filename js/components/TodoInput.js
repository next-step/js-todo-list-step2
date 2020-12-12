export default function TodoInput($element, { addTodo }) {

    const inputEnterEvent = e => {
        if(e.code === 'Enter'){
            const title = e.target.value.trim() ?? '';
            if(title){
               addTodo(e.target.value);
            }
            e.target.value = "";
        }
    }

    this.toggleLoading = loading => {
        $element.classList.toggle('disabled', loading);
    }

    this.bindEvents = () => {
        $element.addEventListener('keyup', inputEnterEvent);
    }

    this.init = () => {
        this.bindEvents();
    }

    this.init();
}