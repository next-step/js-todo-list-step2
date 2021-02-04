/*@jsx Reilly.createElement*/
import Reilly from 'reilly';

function ToggleAll() {
  return (
    <div>
      <input id="toggle-all" className="toggle-all" type="checkbox" />
      <label>
        <button onclick={e => console.warn('plz implement toggle-all!')}>
          🎊
        </button>
      </label>
    </div>
  );
}

export default ToggleAll;
