class Observable {

  constructor(value) {
    this._listeners = [];
    this._value = value;
  }

  notify() {
    this._listeners.forEach(listener => listener(this._value));
  }

  subscribe(listener) {
    this._listeners.push(listener);
  }

  get value() {
    return this._value;
  }

  set value(val) {
    if (val !== this._value) {
      this._value = val;
      this.notify();
    }
  }
}

const todoObserver = new Observable([]);