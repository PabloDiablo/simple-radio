// @flow

function createEvent(): Object {
    return {
        handlers: []
    };
}

class SimpleRadio {

    _requests: Object;
    _events: Object;

    constructor(): void {
        this._requests = {};
        this._events = {};
    }

    on(evt: string, cb: Function): void {
        // Type and value check
        if (!evt || !cb || typeof evt !== 'string' || typeof cb !== 'function') {
            return;
        }

        // Find event
        let storedEvent = this._events[evt];

        // Create event if it doesn't exist
        if (!storedEvent) {
            storedEvent = this._events[evt] = createEvent();
        }

        // Add handler
        storedEvent.handlers.push(cb);
    }

    off(evt: string, cb: Function): void {
        // Type and value check
        if (!evt || !cb || typeof evt !== 'string' || typeof cb !== 'function') {
            return;
        }

        // Find event
        let storedEvent = this._events[evt];

        // Exit if it doesn't exist
        if (!storedEvent) {
            return;
        }

        // Find and remove cb
        storedEvent.handlers = storedEvent.handlers.filter(x => x !== cb);
    }

    emit(evt: string): void {
        // Type and value check
        if (!evt || typeof evt !== 'string') {
            return;
        }

        // Find event
        let storedEvent = this._events[evt];

        // Exit if it doesn't exist
        if (!storedEvent) {
            return;
        }
		
		const args = Array.prototype.slice.call(arguments, 1);

        // Execute each handler
        storedEvent.handlers.forEach(cb => cb(...args));
    }

    request(req: string): any {
        // Type and value check
        if (!req || typeof req !== 'string') {
            return undefined;
        }

        // Find and call cb
        let cb = this._requests[req];

        // Return undefined if no callback registered
        if (!cb) {
            return undefined;
        }

		const args = Array.prototype.slice.call(arguments, 1);
		
        return cb(...args);
    }

    reply(req: string, cb: Function): void {
        // Type and value check
        if (!req || !cb || typeof req !== 'string' || typeof cb !== 'function') {
            return;
        }

        // Add cb to object
        this._requests[req] = cb;
    }

    replyOnce(req: string, cb: Function): void {
        // Type and value check
        if (!req || !cb || typeof req !== 'string' || typeof cb !== 'function') {
            return;
        }

        // Wrap callback fn to remove after first execution
        const wrappedCb = () => {
            this.stopReplying(req);
			const args = Array.prototype.slice.call(arguments, 1);
            return cb(...args);
        };

        this.reply(req, wrappedCb);
    }

    stopReplying(req: string): void {
        // Type and value check
        if (!req || typeof req !== 'string') {
            return;
        }

        // Remove callback fn
        delete this._requests[req];
    }

    reset(): void {
        Object.keys(this._requests).forEach(x => delete this._requests[x]);
        Object.keys(this._events).forEach(x => delete this._events[x]);
    }

}

export default SimpleRadio;
