(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Radio"] = factory();
	else
		root["Radio"] = factory();
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
	exports.on = on;
	exports.off = off;
	exports.emit = emit;
	exports.request = request;
	exports.reply = reply;
	exports.replyOnce = replyOnce;
	exports.stopReplying = stopReplying;
	exports.reset = reset;
	
	
	// Requests
	var _requests = {};
	
	// Events
	var _events = {};
	
	function createEvent() {
	    return {
	        handlers: []
	    };
	}
	
	function on(evt, cb) {
	
	    // Type and value check
	    if (!evt || !cb || typeof evt !== 'string' || typeof cb !== 'function') {
	        return;
	    }
	
	    // Find event
	    var storedEvent = _events[evt];
	
	    // Create event if it doesn't exist
	    if (!storedEvent) {
	        storedEvent = _events[evt] = createEvent();
	    }
	
	    // Add handler
	    storedEvent.handlers.push(cb);
	}
	
	function off(evt, cb) {
	
	    // Type and value check
	    if (!evt || !cb || typeof evt !== 'string' || typeof cb !== 'function') {
	        return;
	    }
	
	    // Find event
	    var storedEvent = _events[evt];
	
	    // Exit if it doesn't exist
	    if (!storedEvent) {
	        return;
	    }
	
	    // Find and remove cb
	    storedEvent.handlers = storedEvent.handlers.filter(function (x) {
	        return x !== cb;
	    });
	}
	
	function emit(evt, data) {
	    // Type and value check
	    if (!evt || typeof evt !== 'string') {
	        return;
	    }
	
	    // Find event
	    var storedEvent = _events[evt];
	
	    // Exit if it doesn't exist
	    if (!storedEvent) {
	        return;
	    }
	
	    // Execute each handler
	    storedEvent.handlers.forEach(function (cb) {
	        return cb();
	    });
	}
	
	function request(req) {
	
	    // Type and value check
	    if (!req || typeof req !== 'string') {
	        return undefined;
	    }
	
	    // Find and call cb
	    var cb = _requests[req];
	
	    // Return undefined if no callback registered
	    if (!cb) {
	        return undefined;
	    }
	
	    return cb();
	}
	
	function reply(req, cb) {
	
	    // Type and value check
	    if (!req || !cb || typeof req !== 'string' || typeof cb !== 'function') {
	        return;
	    }
	
	    // Add cb to object
	    _requests[req] = cb;
	}
	
	function replyOnce(req, cb) {
	
	    // Type and value check
	    if (!req || !cb || typeof req !== 'string' || typeof cb !== 'function') {
	        return;
	    }
	
	    // Wrap callback fn to remove after first execution
	    var wrappedCb = function wrappedCb() {
	        stopReplying(req);
	        return cb();
	    };
	
	    reply(req, wrappedCb);
	}
	
	function stopReplying(req) {
	
	    // Type and value check
	    if (!req || typeof req !== 'string') {
	        return;
	    }
	
	    // Remove callback fn
	    delete _requests[req];
	}
	
	function reset() {
	    Object.keys(_requests).forEach(function (x) {
	        return delete _requests[x];
	    });
	    Object.keys(_events).forEach(function (x) {
	        return delete _events[x];
	    });
	}
	
	exports.default = {
	    on: on,
	    off: off,
	    emit: emit,
	    request: request,
	    reply: reply,
	    replyOnce: replyOnce,
	    stopReplying: stopReplying,
	    reset: reset
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=Radio.js.map