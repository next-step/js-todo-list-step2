export default function TodoInput($el, {}, { createTodoItem }) {
  this.$el = $el

  const bindEvents = () => {
    this.$el.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        event.stopPropagation()
        createTodoItem(event.target.value)
        event.target.value = ''
      }
    })
  }

  this.render = function () {
    this.$el.innerHTML = `
            <section class="input-container">
                <input
                    class="new-todo"
                    placeholder="할 일을 입력해주세요."
                    autofocus
                />
            </section> 
        `

    bindEvents()
  }

  this.initialize = function () {
    this.render()
  }

  this.initialize()
}
