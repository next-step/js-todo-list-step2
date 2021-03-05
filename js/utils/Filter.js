export default class Filter {

  constructor() {
    this.FILTER_TYPE = {
      all: () => true,
      active: v => !v.isDone,
      completed: v => v.isDone
    }
  }

  filteringTodoItems = (type, todoItems) => todoItems.filter(this.FILTER_TYPE[type]);
}