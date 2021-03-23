const $inputContainer = document.querySelector('section.input-container');
const INPUT_CLASS = 'new-todo';

const eventHandler = (addItem) => {
  const _createTodoItem = ({ target, key }) => {
    if (!target.classList.contains(INPUT_CLASS)) {
      return;
    }
    if (key !== 'Enter') {
      return;
    }

    addItem(target.value.trim());
    target.value = '';
  };

  const addEventListener = ($input) => {
    $input.addEventListener('keyup', _createTodoItem);
  };

  return {
    addEventListener,
  };
};

const todoInput = (addItem) => {
  const $input = $inputContainer.querySelector(`.${INPUT_CLASS}`);

  const _eventHandler = eventHandler(addItem);
  _eventHandler.addEventListener($input);

  return {
    focus() {
      $input.focus();
    },
  };
};

export { todoInput };
