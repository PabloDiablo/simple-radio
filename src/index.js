// @flow

// Requests
const _requests = {};

// Events
const _events = {};

function createEvent(): Object {
    return {
        handlers: []
    };
}

export function on(evt: string, cb: Function): void {

    // Type and value check
    if (!evt || !cb || typeof evt !== 'string' || typeof cb !== 'function') {
        return;
    }

    // Find event
    let storedEvent = _events[evt];

    // Create event if it doesn't exist
    if (!storedEvent) {
        storedEvent = _events[evt] = createEvent();
    }

    // Add handler
    storedEvent.handlers.push(cb);
}

export function off(evt: string, cb: Function): void {

    // Type and value check
    if (!evt || !cb || typeof evt !== 'string' || typeof cb !== 'function') {
        return;
    }

    // Find event
    let storedEvent = _events[evt];

    // Exit if it doesn't exist
    if (!storedEvent) {
        return;
    }

    // Find and remove cb
    storedEvent.handlers = storedEvent.handlers.filter(x => x !== cb);
}

export function emit(evt: string, data: Object): void {
    // Type and value check
    if (!evt || typeof evt !== 'string') {
        return;
    }

    // Find event
    let storedEvent = _events[evt];

    // Exit if it doesn't exist
    if (!storedEvent) {
        return;
    }

    // Execute each handler
    storedEvent.handlers.forEach(cb => cb(data));
}

export function request(req: string, data: Object): any {

    // Type and value check
    if (!req || typeof req !== 'string') {
        return undefined;
    }

    // Find and call cb
    let cb = _requests[req];

    // Return undefined if no callback registered
    if (!cb) {
        return undefined;
    }

    return cb(data);
}

export function reply(req: string, cb: Function): void {

    // Type and value check
    if (!req || !cb || typeof req !== 'string' || typeof cb !== 'function') {
        return;
    }

    // Add cb to object
    _requests[req] = cb;
}

export function replyOnce(req: string, cb: Function): void {

    // Type and value check
    if (!req || !cb || typeof req !== 'string' || typeof cb !== 'function') {
        return;
    }

    // Wrap callback fn to remove after first execution
    const wrappedCb = function (data) {
        stopReplying(req);
        return cb(data);
    };

    reply(req, wrappedCb);
}

export function stopReplying(req: string): void {

    // Type and value check
    if (!req || typeof req !== 'string') {
        return;
    }

    // Remove callback fn
    delete _requests[req];
}

export function reset(): void {
    Object.keys(_requests).forEach(x => delete _requests[x]);
    Object.keys(_events).forEach(x => delete _events[x]);
}

export default {
    on,
    off,
    emit,
    request,
    reply,
    replyOnce,
    stopReplying,
    reset
};
