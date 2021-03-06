class EventEmitter {
    constructor() {
        this.events = {};
    }

    subscribe(eventName, fn) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }

        this.events[eventName].push(fn);
    }

    unsubscribe(eventName, fn) {
        this.events[eventName] = this.events[eventName].filter(eventFn => {
            return fn !== eventFn;
        });
    }

    emit(eventName, data) {
        var event = this.events[eventName];
        if (event) {
            event.forEach(fn => {
                fn.call(null, data);
            });
        }
    }
}