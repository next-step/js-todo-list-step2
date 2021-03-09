/*@jsx Reilly.createElement*/
import Reilly from 'reilly';

function FilterButton({ name, mode, onModeChange, content }) {
  return (
    <a
      href={'#' + name}
      className={`${name} ${mode === name ? 'selected' : ''}`}
      onclick={onModeChange}
    >
      {content}
    </a>
  );
}

export default FilterButton;
