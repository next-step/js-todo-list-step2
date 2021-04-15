class Subject {
  constructor() {
    this.observers = [];
  }
  addObserver(observer) {
    this.observers = [...this.observers, observer];
  }

  removeObserver(observer) {
    const filteredList = this.observers.filter((v) => v !== observer);
    this.observers = filteredList;
  }

  notifyAll() {
    this.observers.forEach((observer) => observer.update());
  }
}

export default Subject;
