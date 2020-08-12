import { loadingComponentTemplate } from '../utils/templates.js'

export default function Loading({ selector }) {
  if (new.target !== Loading) return new Loading({ selector })

  this.render = () => {
    this.$target = document.querySelector(selector)
    this.$target.innerHTML = loadingComponentTemplate
  }
}
