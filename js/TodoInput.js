export default function TodoInput($todoInput, onAdd){
    this.$todoInput = $todoInput
    this.$todoInput.addEventListener('keyup', (e) => {
        if (e.keyCode === KEY.ENTER_KEY){
            if (!/\S/.test(this.$todoInput.value) || this.$todoInput === null){
                alert('할일을 입력하세요!')
                return
            }

            onAdd(this.$todoInput.value)

            this.$todoInput.value = ''
        }
    })
}
