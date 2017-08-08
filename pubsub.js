/**
 * @namespace
 * @property {Function} fire - fire an event on event bus
 * @property (Function) listen - listen an event on event bus
 */
var PUBSUB = (function() {
    'use strict';
    /**
     * @namespace
     * @private
     */
    var eventBus = {};

    /**
     * @function
     * @public
     * @this PUBSUB
     * @param {string} event - name of custom event
     * @param {function} callback - function to call when event rises
     * @param {object} context - "this" value of callback owner
     * @returns {object} - PUBSUB object for methods chaining
     * @throws Will throw an error if arguments is not valid
     */
    function listen(event, callback, context) {
        if ((!event) || (typeof callback !== 'function') || (typeof context !== 'object')) {
            throw new Error('PUBSUB.listen arguments is not valid');
        }

        if (eventBus[event] === undefined) {
            eventBus[event] = [];
        }

        eventBus[event].push({
                                 callback: callback,
                                 context : context
                             });
        return this;
    }

    /**
     * @function
     * @public
     * @this PUBSUB
     * @param {string} event - name of custom event
     * @param {object} data - data arguments for callback
     * @returns {object} - PUBSUB object for methods chaining
     * @throws Will throw an error if event type is not valid String
     */
    function fire(event, data) {
        if (!event || typeof data !== 'object') {
            throw new Error('PUBSUB.fire arguments is not valid');
        }

        var listeners = eventBus[event] ? eventBus[event] : [],
            i;

        for (i = 0; i < listeners.length; i++) {
            listeners[i].callback.call(listeners[i].context, data);
        }
        return this;
    }

    return {
        listen: listen,
        fire  : fire
    };
}());
