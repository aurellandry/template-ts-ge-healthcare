export class ClockObserver {
  private observers: Function[];

  constructor() {
    this.observers = [];
  }

  subscribe(callback: Function) {
    this.observers.push(callback);
  }

  notify() {
    this.observers.forEach(observer => observer());
  }
}