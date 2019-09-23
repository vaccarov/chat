class Subscription {
    behaviorSubject;
    fn;

    constructor(behaviorSubject, fn) {
        this.behaviorSubject = behaviorSubject;
        this.fn = fn;
    }

    unsubscribe() {
        if (this.behaviorSubject.observers) {
            return this.behaviorSubject.observers.filter((subscriber) => subscriber !== fn)
        }
    }

}

class Observable {
    observers = [];
    val = {};


    constructor(val) {
        this.val = val;
    }

    assign(val) {
        Object.assign(this.val, val)
    }

    next(val) {
        this.val = val;
        this.observers.forEach((subscriber) => subscriber(val));
    }

    subscribe(fn) {
        this.observers.push(fn);
        fn(this.val);
        return new Subscription(fn);
    }

    complete() {
        this.observers = []
    }
}