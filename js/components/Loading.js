import { $LOADING, $TODO_LIST } from '../config/htmlElement.js';
class Loading {
  constructor() {
    this.isLoading = true;
    $LOADING.className = 'loading-view';
    $TODO_LIST.classList.add('loading-hide');
  }

  render() {
    if (this.isLoading) {
      $LOADING.className = 'loading-view';
      $TODO_LIST.classList.remove('loading-view');
      $TODO_LIST.classList.add('loading-hide');
    } else {
      $LOADING.className = 'loading-hide';
      $TODO_LIST.classList.remove('loading-hide');
      $TODO_LIST.classList.add('loading-view');
    }
  }

  setState(view) {
    this.isLoading = view;
    this.render();
  }
}

export default Loading = new Loading();
