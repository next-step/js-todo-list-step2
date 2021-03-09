import { MESSAGES } from './constants';
import { isValid } from './validation/input';
import WordService from './validation/Word';

/**
 * @description native interaction API abstraction
 */
const Interactions = {
  askName(defaultName) {
    if (defaultName && typeof defaultName !== 'string')
      console.error('config for defaultName has string type');

    let name;
    while (true) {
      name = prompt(MESSAGES.ASK_NAME, defaultName)?.trim();
      if (!name) break;

      if (isValid.username(name)) break;
      else alert(MESSAGES.NAME_POLICY_NOTICE);
    }

    return name;
  },
  confirmDelete(target) {
    return confirm(MESSAGES.CONFIRM_DELETE + ' ' + (target || ''));
  },
  confirmDeleteAll() {
    return confirm(MESSAGES.CONFIRM_DELETE_ALL);
  },
  warnTodo(content) {
    if (content.length < 2) return alert('too short name!');
    if (!WordService.isValid(content)) return alert('no swearing');
  },
  noTodos() {
    alert('No todos to delete!');
  },
  noUserToDelete() {
    alert('No user to delete!');
  },
};

export default Interactions;
