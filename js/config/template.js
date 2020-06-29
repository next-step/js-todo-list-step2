const contentWrapper = ({ _id, contents, isCompleted }) => {
  const checked = isCompleted ? 'checked' : '';
  return `<div class="view">
        <input class="toggle" type="checkbox" name="${_id}" ${checked}/>
        <label for="${_id}">${contents}</label>
        <button class="delete" name="${_id}"></button>
      </div>`;
};

const editInput = ({ _id, contents }) => {
  return `<input class="edit" name="${_id}" value="${contents}" autofocus/>`;
};

export const itemTemplate = props => {
  const { _id, isCompleted } = props;
  const completed = isCompleted ? 'completed' : '';
  return `<li id=${_id} class="${completed}"> 
            ${contentWrapper(props)} 
            ${editInput(props)} 
        </li>`;
};
