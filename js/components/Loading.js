import { $LOADING, $TODO_LIST } from '../config/htmlElement.js';
class Loading {
  constructor() {
    $LOADING.className = 'loading-view';
    $TODO_LIST.classList.add('loading-hide');
  }

  setState(view) {
    if (view) {
      $LOADING.className = 'loading-view';
      $TODO_LIST.classList.remove('loading-view');
      $TODO_LIST.classList.add('loading-hide');
    } else {
      $LOADING.className = 'loading-hide';
      $TODO_LIST.classList.remove('loading-hide');
      $TODO_LIST.classList.add('loading-view');
    }
  }
}

export default Loading = new Loading();
