export default function TodoAppTitle({ $target, username }) {
  if (!(this instanceof TodoAppTitle)) {
    throw new Error('TodoAppTitle must be called with new')
  }

  if (!$target) {
    throw new Error('$target must be injected')
  }

  this.$target = $target
  this.title = this.$target.querySelector('span > strong')
  this.username = username

  this.setState = function (nextData) {
    this.username = nextData
    this.render()
  }

  this.render = function () {
    this.$target.dataset.username = this.username
    this.title.innerHTML = this.username
  }
  this.render()
}
