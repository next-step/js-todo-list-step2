/*@jsx Reilly.createElement*/
import Reilly from '../../lib/reilly/Reilly';
import { FILTER_STATUS } from '../../types/constants';
import FilterButton from '../atom/FilterButton';

class FilterList extends Reilly.Component {
  render() {
    const { mode, onModeChange } = this.props;
    const { ALL, ACTIVE, COMPLETED } = FILTER_STATUS;

    return (
      <ul className="filters">
        {[ALL, ACTIVE, COMPLETED].map(name => (
          <li>
            <FilterButton name={name} mode={mode} onModeChange={onModeChange} />
          </li>
        ))}
      </ul>
    );
  }
}

export default FilterList;
