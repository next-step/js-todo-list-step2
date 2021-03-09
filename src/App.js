/*@jsx Reilly.createElement*/
import Reilly from 'reilly';
import { Title, Main } from 'components';
import { UserService } from './services';
import { store } from './index';
import ReillyDOM from './lib/reillyDOM/ReillyDOM';
import { UserList } from './components';
import { useSelector } from './lib/reducs';
import { fetchUsersAsync } from './reducs/module/user';

class App extends Reilly.Component {
  constructor(props) {
    super(props);
    this.fetchUserList();
  }

  async fetchUserList() {
    store.dispatch(fetchUsersAsync());
  }

  unsub;
  render() {
    const { user, mode, error, editingId } = useSelector(state => state.user);

    if (this.unsub) this.unsub();
    this.unsub = store.subscribe(() => {
      ReillyDOM.render(this.render(), document.getElementById('root'));
    });

    if (editingId) {
      window.onbeforeunload = () => '작성 중인 메시지가 있습니다.';
    } else {
      window.onbeforeunload = null;
    }

    console.log('RENDERED!');

    if (error) {
      return (
        <div>
          <h1> {error.message} Error occured!</h1>
          <h2>
            <a href="/">plz reload</a>
          </h2>
        </div>
      );
    }

    return (
      <div id="app">
        <Title id="user-title" user={user} />
        <UserList />
        <div className="todoapp">
          {user && <Main mode={mode} editingId={editingId} />}
        </div>
      </div>
    );
  }
}

export default App;
