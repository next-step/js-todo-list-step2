import { createStore } from '../lib/reducs';
import { thunk, logger } from './middlewares';
import reducer from './module/reducer';

function configStore() {
  return createStore(reducer, [thunk, logger]);
}
export default configStore;
