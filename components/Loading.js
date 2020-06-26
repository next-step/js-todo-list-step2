import {checkSelector} from "../utils/validations.js"

export default function Loading({ selector }) {
  if (new.target !== Loading) return new Loading({ selector })
  checkSelector(selector)

  this.render = () => {
    this.$target = document.querySelector(selector)
    this.$target.innerHTML = `
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
                </li>
    `
  }
}
