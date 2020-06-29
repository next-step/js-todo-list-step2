export default function TodoAppTitle({ $target, username }) {
  if (!new.target) {
    throw new Error('TodoAppTitle must be called with new')
  }

  if (!$target) {
    throw new Error('$target must be injected')
  }

  this.$target = $target
  this.$username = this.$target.querySelector('#username')
  this.username = username

  this.setState = function (nextData) {
    this.username = nextData
    this.render()
  }

  this.render = function () {
    this.$target.dataset.username = this.username
    this.$username.innerHTML = this.username
  }
  this.render()
}
