/*@jsx Reilly.createElement*/
import Reilly from '../../lib/reilly/Reilly.js';
import { FILTER_NAMES } from '../../types/constants.js';

function FilterButton({ name, mode, onModeChange }) {
  return (
    <a
      href={'#' + name}
      className={`${name} ${mode === name ? 'selected' : ''}`}
      onclick={onModeChange}
    >
      {FILTER_NAMES.get(name)}
    </a>
  );
}

export default FilterButton;
