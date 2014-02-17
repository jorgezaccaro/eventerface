/** Creates a simple local mapper that routes every event to its listeners
 * @returns {object} map - The local map created
 */
module.exports = function () {
    var map = {
        events: {},     // A set of the emitted events
        trees: {}       // A set of arrays of listeners of events
    };

    // Map emitted events to all listeners by emitting the event on each of them
    map.emit = function (eventName, message, emitter) {
        // Register the event if this is the first time it is emitted
        var eventEmitter = map.events[eventName];
        if (!eventEmitter) {
            map.events[eventName] = eventEmitter = emitter;
        }

        // If there are any registered listeners to this particular event:
        var eventListeners = map.trees[eventName];
        if (eventListeners) {
            // Send the event to each listener
            eventListeners.forEach(function (listener) {
                if (typeof listener === 'object' && eventEmitter !== listener &&
                    typeof listener.emit === 'function') {
                    listener.ownEmit(eventName, message);
                }
            });     
        }
    }

    // Register a listener to a particular event
    map.on = function (eventName, message, listener) {
        if (!(map.trees[eventName] instanceof Array)) {
            map.trees[eventName] = [];
        }
        map.trees[eventName].push(listener);
    }

    return map;
}