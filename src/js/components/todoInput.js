import { USER_API } from '../constant/constant.js';
import {validLength} from '../utils/utils.js';

class TodoInput {
  constructor($target, { dataController, onKeyDown }) {
    this.$target = $target;
    this.state = {};
    this.dataController = dataController;
    this.$target.addEventListener('keydown', async (e) => {
      const value = e.target.value.trim();
      if (e.key === 'Enter') {
        if (value && validLength(value)) {
          const id = this.state['_id'];
          const body = {
            contents: value
          };
          try {
            const res = await this.dataController.postData(USER_API + `/${id}/items`, body);
            onKeyDown(res);
            e.target.value = '';
          } catch (e) {
            console.error(e);
          }
        }
      }
    });
  }
  setState = (nextState) => {
    this.state = nextState;
  }
}

export default TodoInput;