/*@jsx Reilly.createElement*/
import Reilly from 'reilly';
import cn from 'classnames';

function FilterButton({ name, mode, onModeChange, content }) {
  return (
    <a
      href={'#' + name}
      className={cn(name, { selected: mode === name })}
      onclick={onModeChange}
    >
      {content}
    </a>
  );
}

export default FilterButton;
