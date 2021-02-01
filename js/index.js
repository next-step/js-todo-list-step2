import ReillyDOM from './lib/reilly/ReillyDOM.js';
import { createElement } from './lib/reilly/Reilly.js';
import App from './App.js';

ReillyDOM.render(createElement(App), document.getElementById('root'));
