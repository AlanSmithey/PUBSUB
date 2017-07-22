/**
 * @namespace
 * @property {Function} publish - add an event to event bus
 * @property (Function) subscribe - listen an event on event bus
 */
var MEDIATOR = (function() {
    'use strict';
    /**
     * @namespace
     * @private
     */
    var eventBus = {};

    /**
     * @function
     * @public
     * @this MEDIATOR
     * @param {string} event - name of custom event
     * @param {Function} callback - function to call when event rises
     * @param {Object} context - "this" value of callback owner
     * @returns {Object} - MEDIATOR object for method chaining
     */
    function subscribe(event, callback, context) {
        if (eventBus[event] === undefined) {
            eventBus[event] = [];
        }

        eventBus[event].push({
                                 context : context,
                                 callback: callback
                             });
        return this;
    }

    /**
     * @function
     * @public
     * @this MEDIATOR
     * @param {string} event - name of custom event
     * @param {*} [data] - optional argument for callback
     * @returns {Object} - MEDIATOR object for method chaining
     */
    function publish(event, data) {
        var listeners = (eventBus[event] === undefined) ? [] : eventBus[event],
            i;

        for (i = 0; i < listeners.length; i++) {
            listeners[i].callback.call(listeners[i].context, data);
        }
        return this;
    }

    return {
        publish  : publish,
        subscribe: subscribe
    };
}());
