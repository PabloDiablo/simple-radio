(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SimpleRadio"] = factory();
	else
		root["SimpleRadio"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function createEvent() {
	    return {
	        handlers: []
	    };
	}
	
	var SimpleRadio = function () {
	    function SimpleRadio() {
	        _classCallCheck(this, SimpleRadio);
	
	        this._requests = {};
	        this._events = {};
	    }
	
	    SimpleRadio.prototype.on = function on(evt, cb) {
	        // Type and value check
	        if (!evt || !cb || typeof evt !== 'string' || typeof cb !== 'function') {
	            return;
	        }
	
	        // Find event
	        var storedEvent = this._events[evt];
	
	        // Create event if it doesn't exist
	        if (!storedEvent) {
	            storedEvent = this._events[evt] = createEvent();
	        }
	
	        // Add handler
	        storedEvent.handlers.push(cb);
	    };
	
	    SimpleRadio.prototype.off = function off(evt, cb) {
	        // Type and value check
	        if (!evt || !cb || typeof evt !== 'string' || typeof cb !== 'function') {
	            return;
	        }
	
	        // Find event
	        var storedEvent = this._events[evt];
	
	        // Exit if it doesn't exist
	        if (!storedEvent) {
	            return;
	        }
	
	        // Find and remove cb
	        storedEvent.handlers = storedEvent.handlers.filter(function (x) {
	            return x !== cb;
	        });
	    };
	
	    SimpleRadio.prototype.emit = function emit(evt, data) {
	        // Type and value check
	        if (!evt || typeof evt !== 'string') {
	            return;
	        }
	
	        // Find event
	        var storedEvent = this._events[evt];
	
	        // Exit if it doesn't exist
	        if (!storedEvent) {
	            return;
	        }
	
	        // Execute each handler
	        storedEvent.handlers.forEach(function (cb) {
	            return cb(data);
	        });
	    };
	
	    SimpleRadio.prototype.request = function request(req, data) {
	        // Type and value check
	        if (!req || typeof req !== 'string') {
	            return undefined;
	        }
	
	        // Find and call cb
	        var cb = this._requests[req];
	
	        // Return undefined if no callback registered
	        if (!cb) {
	            return undefined;
	        }
	
	        return cb(data);
	    };
	
	    SimpleRadio.prototype.reply = function reply(req, cb) {
	        // Type and value check
	        if (!req || !cb || typeof req !== 'string' || typeof cb !== 'function') {
	            return;
	        }
	
	        // Add cb to object
	        this._requests[req] = cb;
	    };
	
	    SimpleRadio.prototype.replyOnce = function replyOnce(req, cb) {
	        var _this = this;
	
	        // Type and value check
	        if (!req || !cb || typeof req !== 'string' || typeof cb !== 'function') {
	            return;
	        }
	
	        // Wrap callback fn to remove after first execution
	        var wrappedCb = function wrappedCb(data) {
	            _this.stopReplying(req);
	            return cb(data);
	        };
	
	        this.reply(req, wrappedCb);
	    };
	
	    SimpleRadio.prototype.stopReplying = function stopReplying(req) {
	        // Type and value check
	        if (!req || typeof req !== 'string') {
	            return;
	        }
	
	        // Remove callback fn
	        delete this._requests[req];
	    };
	
	    SimpleRadio.prototype.reset = function reset() {
	        var _this2 = this;
	
	        Object.keys(this._requests).forEach(function (x) {
	            return delete _this2._requests[x];
	        });
	        Object.keys(this._events).forEach(function (x) {
	            return delete _this2._events[x];
	        });
	    };
	
	    return SimpleRadio;
	}();
	
	exports.default = SimpleRadio;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=SimpleRadio.js.map