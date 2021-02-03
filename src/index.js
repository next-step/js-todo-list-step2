/*@jsx createElement */
import ReillyDOM from './lib/reilly/ReillyDOM';
import { createElement } from './lib/reilly/Reilly';
import App from './App';
import './index.css';

ReillyDOM.render(<App />, document.getElementById('root'));
