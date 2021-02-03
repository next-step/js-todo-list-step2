/*@jsx Reilly.createElement*/
import Reilly from '../../lib/reilly/Reilly';
import FilterList from './FilterList';
import ToggleAll from '../atom/ToggleAll';
import DeleteAll from '../atom/DeleteAll';

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
