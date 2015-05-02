/**
 * Created by phear on 4/30/15.
 */
var debug = false;
var zlib = require('zlib')
    , zmq = require('zmq')
    , receiver = zmq.socket('sub')
    , db = require('./db.js');


/**
 * Using EDDN's relay for Commodity Data
 */
receiver.connect('tcp://eddn-relay.elite-markets.net:9500');

console.log('Worker connected');

/**
 * EDDN ZMQ listener
 */
receiver.on('message', function (buf) {

    /**
     * Decompress the stream
     */
    zlib.inflate(buf, function (err, res) {
        if (err) throw err;

        /**
         * Parse the response
         */
        var record = JSON.parse(res.toString());

        if (debug)
            console.log(record);

        /**
         * Header information from EDDN commodity schema v1
         * $schemaRef": "http://schemas.elite-markets.net/eddn/commodity/1
         * @type {Object}
         */
        var header = record.header;
        header.time = new Date(record.header.gatewayTimestamp).getTime();
        delete header.gatewayTimestamp;
        if (debug)
            console.log(header);

        db.writePoint('headers', header);


        /**
         * Message body from EDDN commodity schema v1
         * $schemaRef": "http://schemas.elite-markets.net/eddn/commodity/1
         * @type {Object}
         */
        var message = record.message;
        message.time = new Date(record.message.timestamp).getTime();
        delete message.timestamp;
        if (debug)
            console.log(message);

        db.writePoint('messages', message);
        db.writePoint(message.stationName, message);
        db.writePoint(message.itemName, message);

    });
});

//Subscribe to the feed
receiver.subscribe('');