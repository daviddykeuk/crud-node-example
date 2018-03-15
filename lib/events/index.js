var EventHandler = function(eventTransport) {
	// make sure a transport has been provided, else panic
	assert(eventTransport);

	// set the transport as an object property
	this.transport = eventTransport;

	this.emit = (name, message) => {
		// TODO: log (via monitoring) that an event is to be raised

		// emit the event via the injected transport
		eventTransport.emit(name, message, retries, handleMessageTransmition);
	};
};

function handleMessageTransmition(err) {
	if (err) {
		// TODO: an alarm must be raised here, this means that something happened in the code but the event wasn't recieved by the event-hub

	} else {
		// TODO: log (via monitoring) that an event was raised successfully

	}
}

module.exports = EventHandler;