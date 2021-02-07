/*@jsx Reilly.createElement*/
import Reilly from 'reilly';
import { FILTER_STATUS, FILTER_NAMES } from 'utils';
import { FilterButton } from 'components';

class FilterList extends Reilly.Component {
  render() {
    const { mode, onModeChange } = this.props;
    const { ALL, ACTIVE, COMPLETED } = FILTER_STATUS;

    return (
      <ul className="filters">
        {[ALL, ACTIVE, COMPLETED].map(name => (
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
}

export default FilterList;
