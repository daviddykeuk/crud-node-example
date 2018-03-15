var MonitorHandler = function(monitoringTransport) {
    // make sure a transport has been provided, else panic
    assert(monitoringTransport);

    // set the transport as an object property
    this.transport = monitoringTransport;

    this.emit = (object) => {
        // emit the event via the injected transport
        eventTransport.emit(object, handleMessageTransmition);
    }
}

function handleMessageTransmition(err) {
    if (err) {
        // TODO: send this to an array to be sent later when monitoring connection is back up

    } else {
        flushBacklog();

        // Push the message to stdout

    }
}

function flushBacklog() {
    // check the global array and try to resend the messages

}

module.exports = MonitorHandler;