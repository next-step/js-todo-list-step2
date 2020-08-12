export default function TodoDeleteAll({ $target, onDeleteAll }) {
  if (!new.target) {
    throw new Error('TodoDeletAll must be called with new')
  }

  if (!$target) {
    throw new Error('$target must be injected')
  }
  this.$target = $target

  const onClickHandler = (e) => {
    onDeleteAll()
  }

  this.$target.addEventListener('click', onClickHandler)
}
