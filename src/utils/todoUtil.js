const validationTodo = (contents) => {
  return !contents ? false : contents.length >= 2
}

export { validationTodo }
