export default function Loading({ $target, isLoading }) {
  if (!(this instanceof Loading)) {
    throw new Error('Loading must be called with new')
  }

  if (!$target) {
    throw new Error('$target must be injected')
  }
  this.$target = $target
  this.isLoading = isLoading

  const loadingTemplate = () => `
    <li>
      <div class="view">
        <label class="label">
          <div class="animated-background">
            <div class="skel-mask-container">
              <div class="skel-mask"></div>
            </div>
          </div>
        </label>
      </div>
    </li>`

  this.setState = function (nextData) {
    this.isLoading = nextData
    this.render()
  }

  this.render = function () {
    if (this.isLoading) {
      this.$target.innerHTML = loadingTemplate()
    }
  }

  this.render()
}
