# Simple Radio
A class for creating a simple pub/sub radio.

Based on the API of [Backbone.Radio](https://github.com/marionettejs/backbone.radio)


## Usage

```js
import SimpleRadio from 'simple-radio';
const radio = new SimpleRadio();
```

## API

### request(name, data)

Make a request for `name`. Optionally pass data. Returns reply if defined. Otherwise returns `undefined`.


### reply(name, callback)

Respond to a request for `name`. Callback function receives `data` from request as parameter.
Return value is passed back to request.


### replyOnce(name, callback)

Same as above but removes reply after one reply.


### stopReplying(name)

Removes reply handler for specified name.


### on(name, callback)

Add callback for when `name` is emitted.


### off(name, callback)

Removes specified callback.


### emit(name, data)

Emits `name` with optional `data`.


### reset()

Removes all reply and emit handlers.