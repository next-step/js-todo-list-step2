const CLASS_COMPLETED = 'completed';
const CLASS_EDITING = 'editing';
const ATTRIBUTE_CHECKED = 'checked';

const extractState = ($li) => {
  return {
    _id: $li.dataset.id,
    contents: $li.querySelector('.label .content').textContent,
    isCompleted: $li.querySelector('.toggle').hasAttribute('checked'),
  };
};

const eventHandler = (updateTodoContents, updateToggle, removeTodoItem) => {
  const _toggleCompleteStatus = ({ target }) => {
    if (!target.classList.contains('toggle')) {
      return;
    }

    const $li = target.closest('li');
    const isCompleted = target.toggleAttribute(ATTRIBUTE_CHECKED);
    if (isCompleted) {
      $li.classList.add(CLASS_COMPLETED);
    } else {
      $li.classList.remove(CLASS_COMPLETED);
    }

    updateToggle(extractState($li));
  };

  const _changeToEditMode = ({ target }) => {
    if (!target.classList.contains('label')) {
      return;
    }

    const $li = target.closest('li');
    $li.classList.add(CLASS_EDITING);
    $li.querySelector('.edit').focus();
  };

  const _changeToViewModeOnFocusout = ({ target }) => {
    _changeToViewMode(target);
  };

  const _changeToViewModeOnEnter = ({ target, key }) => {
    if (key !== 'Enter') {
      return;
    }
    _changeToViewMode(target);
  };

  const _changeToViewMode = (target) => {
    if (!target.classList.contains('edit')) {
      return;
    }
    const $li = target.closest('li');
    $li.classList.remove(CLASS_EDITING);

    const $labelContent = $li.querySelector('.label .content');
    const updatedContent = target.value.trim();
    $labelContent.textContent = updatedContent;

    updateTodoContents(extractState($li));
  };

  const _escapeToViewMode = ({ target, key }) => {
    if (!target.classList.contains('edit')) {
      return;
    }

    if (key !== 'Escape') {
      return;
    }

    const $li = target.closest('li');
    $li.classList.remove(CLASS_EDITING);

    const $label = $li.querySelector('.label');
    const oldContent = $label.textContent;
    target.value = oldContent;

    return;
  };

  const _removeTodoItem = ({ target }) => {
    if (!target.classList.contains('destroy')) {
      return;
    }

    if (!window.confirm('정말로 삭제하시겠습니까?')) {
      return;
    }

    const $li = target.closest('li');
    $li.remove();
    removeTodoItem(extractState($li));
  };

  const addEventListener = ($liTemplate) => {
    $liTemplate.addEventListener('click', _toggleCompleteStatus);
    $liTemplate.addEventListener('dblclick', _changeToEditMode);
    $liTemplate.addEventListener('keyup', _changeToViewModeOnEnter);
    $liTemplate.addEventListener('focusout', _changeToViewModeOnFocusout);
    $liTemplate.addEventListener('keyup', _escapeToViewMode);
    $liTemplate.addEventListener('click', _removeTodoItem);

    return $liTemplate;
  };

  return {
    addEventListener,
  };
};

const todoList = ($ulist, updateTodoContents, updateToggle, removeTodoItem) => {
  const _eventHandler = eventHandler(
    updateTodoContents,
    updateToggle,
    removeTodoItem
  );

  const _createListItemTemplate = () => {
    const $liTemplate = document.createElement('li');

    const $innerDiv = document.createElement('div');
    $innerDiv.classList.add('view');

    const $innerInput = document.createElement('input');
    $innerInput.type = 'checkbox';
    $innerInput.classList.add('toggle');

    const $innerLabel = document.createElement('label');
    $innerLabel.classList.add('label');

    const $innerButton = document.createElement('button');
    $innerButton.classList.add('destroy');

    $innerDiv.appendChild($innerInput);
    $innerDiv.appendChild($innerLabel);
    $innerDiv.appendChild($innerButton);

    const $listInput = document.createElement('input');
    $listInput.classList.add('edit');

    $liTemplate.appendChild($innerDiv);
    $liTemplate.appendChild($listInput);

    return $liTemplate;
  };

  const _createListItem = (todoItem) => {
    const index = todoItem._id;
    const content = todoItem.contents;
    const isCompleted = todoItem.isCompleted;

    const $todoItem = _eventHandler.addEventListener(_createListItemTemplate());
    const $todoLabel = $todoItem.querySelector('label.label');

    const $labelSpan = document.createElement('span');
    $labelSpan.classList.add('content');
    $labelSpan.textContent = content;
    $todoLabel.appendChild($labelSpan);

    $todoItem.querySelector('input.edit').value = content;

    if (isCompleted) {
      $todoItem.classList.add(CLASS_COMPLETED);
      $todoItem
        .querySelector('input.toggle')
        .setAttribute(ATTRIBUTE_CHECKED, null);
    }
    $todoItem.dataset.id = index;

    return $todoItem;
  };

  const loading = () => {
    $ulist.innerHTML = `<li>
    <div class="view">
      <label class="label">
        <div class="animated-background">
          <div class="skel-mask-container">
            <div class="skel-mask"></div>
          </div>
        </div>
      </label>
    </div>
  </li>`;
  };

  const _empty = () => {
    $ulist.innerHTML = '';
  };

  const _render = ($listItem) => {
    $ulist.appendChild($listItem);
  };

  return {
    addItem(todoItem) {
      _render(_createListItem(todoItem));
    },
    refresh(todoItems) {
      _empty();
      todoItems.map(_createListItem).forEach(_render);
    },
    loading,
  };
};

export { todoList };
