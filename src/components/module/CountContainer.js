/*@jsx Reilly.createElement*/
import Reilly from '../../lib/reilly/Reilly.js';
import FilterList from './FilterList.js';
import { ToggleAll } from '../atom/ToggleAll.js';
import { DeleteAll } from '../atom/DeleteAll.js';

class CountContainer extends Reilly.Component {
  render() {
    const { mode, length, onModeChange, onDeleteAll } = this.props;

    return (
      <div className="count-container">
        <span className="todo-count">
          총 <strong>{length || '0'}</strong> 개
        </span>
        <FilterList mode={mode} onModeChange={onModeChange}></FilterList>
        <ToggleAll />
        <DeleteAll onDeleteAll={onDeleteAll} />
      </div>
    );
  }
}

export default CountContainer;
