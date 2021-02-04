/*@jsx Reilly.createElement*/
import Reilly from 'reilly';
import { FilterList, ToggleAll, DeleteAll, TodoCount } from 'components';

class TodoFooter extends Reilly.Component {
  render() {
    const { mode, length, onModeChange, onDeleteAll } = this.props;

    return (
      <div className="count-container">
        <TodoCount length={length} />
        <FilterList mode={mode} onModeChange={onModeChange}></FilterList>
        <ToggleAll />
        <DeleteAll onDeleteAll={onDeleteAll} />
      </div>
    );
  }
}

export default TodoFooter;
