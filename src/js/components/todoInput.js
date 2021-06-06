import { USER_API } from '../constant/constant.js';
import {validLength} from '../utils/utils.js';

class TodoInput {
  constructor($target, { dataLoader, onKeyDown }) {
    this.$target = $target;
    this.state = {};
    this.dataLoader = dataLoader;
    this.$target.addEventListener('keydown', async (e) => {
      const value = e.target.value.trim();
      if (e.key === 'Enter') {
        if (value && validLength(value)) {
          const id = this.state['_id'];
          const body = {
            contents: value
          };
          const res = await this.dataLoader.postData(USER_API + `/${id}/items`, body);
          onKeyDown(res);
          e.target.value = '';
        }
      }
    });
  }
  setState = (nextState) => {
    this.state = nextState;
  }
}

export default TodoInput;