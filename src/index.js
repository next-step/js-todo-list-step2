/* @jsx createElement */
import { createElement } from './lib/React.js';
import { render } from './lib/ReactDOM.js';
import App from './App.js';
import { createStore } from './lib/Redux.js';
import rootReducer from './modules/index';
import thunk from './lib/middlewares/thunk';
import logger from './lib/middlewares/logger';
import Style from './index.css';
import { getUsers } from './modules/user/index';

// 스토어 생성
export const store = createStore(rootReducer, [thunk, logger]);

// 리스너
const listener = () => {
  const $root = document.querySelector('#root');
  if ($root.firstElementChild) {
    document.querySelector('#root').removeChild($root.firstElementChild);
  }
  render(<App />, $root);
};

store.dispatch(getUsers());

// 리스너 등록
store.subscribe(listener);
render(<App />, document.querySelector('#root'));
