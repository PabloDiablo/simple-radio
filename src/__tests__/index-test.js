jest.dontMock('../index');

var SimpleRadio = require('../index').default;
var Radio = new SimpleRadio();

describe('Radio', () => {

    beforeEach(() => {
        // Reset Radio
        Radio.reset();
    });

    it('should reply to a request', () => {

        // Register reply
        Radio.reply('test-req', () => {
            return 10;
        });

        // Make request
        let returnValue = Radio.request('test-req');

        expect(returnValue).toBe(10);

    });

    it('should reply to a request with data', () => {

        // Register reply
        Radio.reply('test-req', (data) => {
            return 10 + data;
        });

        // Make request
        let returnValue = Radio.request('test-req', 5);

        expect(returnValue).toBe(15);

    });

    it('should emit', () => {

        // Cb function
        let cb = jest.genMockFn();

        // Register listener
        Radio.on('test-emit', cb);

        // Emit
        Radio.emit('test-emit');

        expect(cb).toBeCalled();

    });

    it('should emit with data', () => {

        // Cb function
        let cb = jest.genMockFn();

        // Register listener
        Radio.on('test-emit', cb);

        // Emit
        Radio.emit('test-emit', 'Hello', 'World');

        expect(cb).toBeCalledWith('Hello', 'World');

    });

    it('should remove emit listener with `off`', () => {

        // Cb function
        let cb = jest.genMockFn();

        // Register listener
        Radio.on('test-emit', cb);

        // Emit
        Radio.emit('test-emit');

        expect(cb.mock.calls.length).toBe(1);

        // Unregister listener
        Radio.off('test-emit', cb);

        // Emit
        Radio.emit('test-emit');

        expect(cb.mock.calls.length).toBe(1);

    });

    it('should reply once to a request when using `replyOnce`', () => {

        let cb = function () {
            return 10;
        };

        // Register reply
        Radio.replyOnce('test-req', cb);

        // Make requests
        let returnValue = Radio.request('test-req');
        expect(returnValue).toBe(10);

        let returnValue2 = Radio.request('test-req');
        expect(returnValue2).toBeUndefined();

    });

    it('should stop replying to a request on `stopReplying`', () => {

        let cb = function () {
            return 10;
        };

        // Register reply
        Radio.reply('test-req', cb);

        // Make request
        let returnValue = Radio.request('test-req');
        expect(returnValue).toBe(10);

        Radio.stopReplying('test-req');

        let returnValue2 = Radio.request('test-req');
        expect(returnValue2).toBeUndefined();

    });

    it('should use the last added reply if multiple are added', () => {

        // Register reply
        Radio.reply('test-req', () => {
            return 10;
        });

        // Register reply
        Radio.reply('test-req', () => {
            return 20;
        });

        // Make request
        let returnValue = Radio.request('test-req');

        expect(returnValue).toBe(20);

    });

});