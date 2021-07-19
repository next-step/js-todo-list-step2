export default class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers = [...this.observers, observer];
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((subscribedObserver) => subscribedObserver !== observer);
  }

  notifyObservers() {
    this.observers.forEach((observer) => observer.render());
  }
}
