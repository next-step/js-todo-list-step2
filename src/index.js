/*@jsx Reilly.createElement */
import ReillyDOM from 'reillyDOM';
import Reilly from 'reilly';
import App from './App';
import './index.css';
import configStore from './reducs/configStore';

export const store = configStore();

const rootElement = document.getElementById('root');

ReillyDOM.render(<App />, rootElement);
