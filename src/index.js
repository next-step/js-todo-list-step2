/*@jsx createElement */
import ReillyDOM from './lib/reilly/ReillyDOM.js';
import { createElement } from './lib/reilly/Reilly.js';
import App from './App.js';
import './index.css';

ReillyDOM.render(<App />, document.getElementById('root'));
