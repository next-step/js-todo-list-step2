export default class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers = this.observers.concat(observer);
  }

  publish() {
    this.observers.forEach((cb) => cb());
  }
}
