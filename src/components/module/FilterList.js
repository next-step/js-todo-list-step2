/*@jsx Reilly.createElement*/
import Reilly from 'reilly';
import { FILTER_STATUS, FILTER_NAMES } from 'utils';
import { FilterButton } from 'components';
import { store } from '../..';
``;
import { changeFilterMode } from '../../reducs/module/todo';
import { useSelector } from '../../lib/reducs';

function FilterList() {
  const { mode } = useSelector(state => state.todo);

  const onModeChange = e => {
    const mode = e.target.classList[0];
    store.dispatch(changeFilterMode(mode));
  };

  return (
    <ul className="filters">
      {Object.values(FILTER_STATUS).map(name => (
        <li>
          <FilterButton
            name={name}
            mode={mode}
            onModeChange={onModeChange}
            content={FILTER_NAMES.get(name)}
          />
        </li>
      ))}
    </ul>
  );
}

export default FilterList;
