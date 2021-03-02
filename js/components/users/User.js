export default function User({_id, name}) {

  this.render = () => {
    return `
      <button class="ripple" data-id="${_id}">
      ${name}
      </button>
    `;
  }
}