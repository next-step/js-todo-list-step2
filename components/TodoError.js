export default function TodoError({ elementId, error }) {
  this.$todoError = document.querySelector(`.${elementId}`);
  this.state = {
    error,
  };

  this.setState = (err) => {
    this.state.error = err;
    this.render();
  };

  this.render = () => {
    this.$todoError.innerHTML = `
            <h3>Error occured..Something is wrong with the user's data</h3>
            <p>${this.state.error}</p>
        `;
  };
}
