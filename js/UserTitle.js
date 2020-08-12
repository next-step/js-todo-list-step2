import { userTitleTemplate } from "../utils/templates.js";

export default function UserTitle(params) {
  const { $target } = params;
  this.userName = params.userName;

  this.setState = (nextUserName) => {
    this.userName = nextUserName;
    this.render();
  };

  this.render = () => {
    $target.innerHTML = userTitleTemplate(this.userName);
  };

  this.render();
}
