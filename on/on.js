/** MODULE INTERFACE 
 * @method {function} - 
 */
module.exports = {
    bind: bind
};

/*----------------------------------------------------------------------------*/

/** Attaches a custom .on() handler to the emitter
 * @param {object} emitter - The emitter to which a custom .on() handler will be attached
 * @param {string} map - The namespace where the event mapping is to be done
 * @returns {boolean} - True if the handler could be attached
 */
function bind(emitter, map) {
	if (typeof emitter.on !== 'function') {
        return false;
    }
    // Save a reference to the emitter's #on method
    emitter.ownOn = emitter.on;

    // Expose a new #on method that subscribes the events to the specified map
    emitter.on = function (eventName, message) {
        map.on(eventName, message, emitter); 
        emitter.ownOn.apply(emitter, [].slice.apply(arguments));
    }

    return true;
}